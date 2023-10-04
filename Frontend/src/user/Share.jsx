import React, { useState, useEffect } from 'react';
import { Button, message } from 'antd';
import { FacebookOutlined, WhatsAppOutlined, CopyOutlined } from '@ant-design/icons';
import {
    FacebookShareButton,
    WhatsappShareButton,
} from 'react-share';

const Share = ({ url }) => {
    const [fileUrl, setFileUrl] = useState('');
    
    // Use useEffect to convert the Blob URL to a data URL when the `url` prop changes
    useEffect(() => {
        if (url) {
            convertBlobUrlToDataUrl(url)
                .then(dataUrl => {
                    setFileUrl(dataUrl);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }, [url]);

    const copyToClipboard = () => {
        if (fileUrl) {
            // Create a temporary input element to copy the URL to the clipboard
            const tempInput = document.createElement('input');
            tempInput.value = fileUrl;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);

            // Show a success message
            message.success('Link copied to clipboard');
        } else {
            message.error('File URL is empty');
        }
    };

    async function convertBlobUrlToDataUrl(blobUrl) {
        try {
            // Fetch the Blob data from the Blob URL
            const response = await fetch(blobUrl);
            const blobData = await response.blob();
    
            // Create a FileReader to read the Blob data
            const reader = new FileReader();
    
            return new Promise((resolve, reject) => {
                reader.onload = () => {
                    // Resolve with the data URL
                    resolve(reader.result);
                };
    
                reader.onerror = () => {
                    // Reject if there's an error
                    reject(new Error('Failed to read Blob data.'));
                };
    
                // Read the Blob data as a data URL
                reader.readAsDataURL(blobData);
            });
        } catch (error) {
            throw error;
        }
    }

    return (
        <div>
            <h2 style={{ display: "flex" }}>Share:</h2>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                <FacebookOutlined style={{ fontSize: "40px", padding: "20px" }} onClick={copyToClipboard}/>
            </a>
            <a href="https://web.whatsapp.com/" target="_blank" rel="noopener noreferrer">
                <WhatsAppOutlined style={{ fontSize: "40px", padding: "20px" }} onClick={copyToClipboard} />
            </a>

            {/* React Share Buttons */}
            <FacebookShareButton url={fileUrl} onClick={copyToClipboard}>
                <span style={{ display: "none" }}>Facebook</span>
            </FacebookShareButton>
            <WhatsappShareButton url={fileUrl} onClick={copyToClipboard}>
                <span style={{ display: "none" }}>WhatsApp</span>
            </WhatsappShareButton>

            {/* Copy Link Button */}
            <Button
                type="primary"
                icon={<CopyOutlined />}
                onClick={copyToClipboard}
                style={{ marginLeft: '20px' }}
            >
                Copy Link
            </Button>
        </div>
    )
}

export default Share;
