import React from 'react';
import {
    FacebookShareButton,
    WhatsappShareButton,
} from 'react-share';
import { Button, message } from 'antd';
import { FacebookOutlined, WhatsAppOutlined, CopyOutlined } from '@ant-design/icons';

const Share = ({ url }) => {
    const copyToClipboard = () => {
        // Create a temporary input element to copy the URL to the clipboard
        const tempInput = document.createElement('input');
        tempInput.value = url;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

        // Show a success message
        message.success('Link copied to clipboard');
    };

    return (
        <div>
            <h2 style={{ display: "flex" }}>Share:</h2>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                <FacebookOutlined style={{ fontSize: "40px", padding: "20px" }} onClick={copyToClipboard}/>
            </a>
            <a href="https://web.whatsapp.com/" target="_blank" rel="noopener noreferrer">
                <WhatsAppOutlined style={{ fontSize: "40px", padding: "20px" }} />
            </a>

            {/* React Share Buttons */}
            <FacebookShareButton url={url} onClick={copyToClipboard}>
                <span style={{ display: "none" }}>Facebook</span>
            </FacebookShareButton>
            <WhatsappShareButton url={url} onClick={copyToClipboard}>
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
