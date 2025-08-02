import html2canvas from 'html2canvas';

export const captureAndCopyToClipboard = async (element: HTMLElement): Promise<boolean> => {
  try {
    // Generate screenshot with high quality
    const canvas = await html2canvas(element, {
      useCORS: true,
      allowTaint: true,
      logging: false,
      width: element.offsetWidth,
      height: element.offsetHeight,
    });

    // Convert canvas to blob
    return new Promise((resolve) => {
      canvas.toBlob(async (blob) => {
        if (!blob) {
          resolve(false);
          return;
        }

        try {
          // Copy to clipboard using the modern API
          if (navigator.clipboard && window.ClipboardItem) {
            const clipboardItem = new ClipboardItem({
              'image/png': blob
            });
            await navigator.clipboard.write([clipboardItem]);
            resolve(true);
          } else {
            // Fallback: save as data URL for older browsers
            const dataUrl = canvas.toDataURL('image/png');
            
            // Create a temporary download link as fallback
            const link = document.createElement('a');
            link.download = 'nasib-dompet-screenshot.png';
            link.href = dataUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            resolve(true);
          }
        } catch (error) {
          console.error('Failed to copy to clipboard:', error);
          resolve(false);
        }
      }, 'image/png', 0.95);
    });
  } catch (error) {
    console.error('Failed to capture screenshot:', error);
    return false;
  }
};

export const shareScreenshot = async (element: HTMLElement, text: string, url: string): Promise<void> => {
  try {
    // Try native share first if available
    if (navigator.share && navigator.canShare) {
      const canvas = await html2canvas(element, {
        useCORS: true,
        allowTaint: true,
        logging: false,
      });

      canvas.toBlob(async (blob) => {
        if (blob) {
          const file = new File([blob], 'nasib-dompet.png', { type: 'image/png' });
          
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: 'Nasib Dompet',
              text: text,
              files: [file]
            });
            return;
          }
        }
        
        // Fallback to text share
        await navigator.share({
          title: 'Nasib Dompet',
          text: text,
          url: url,
        });
      });
    } else {
      // Copy screenshot to clipboard as fallback
      const success = await captureAndCopyToClipboard(element);
      if (success) {
        // Also copy text to clipboard
        await navigator.clipboard.writeText(`${text}\n\n${url}`);
      }
    }
  } catch (error) {
    console.error('Share failed:', error);
    // Final fallback: copy text only
    try {
      await navigator.clipboard.writeText(`${text}\n\n${url}`);
    } catch (clipboardError) {
      console.error('Clipboard copy also failed:', clipboardError);
    }
  }
};
