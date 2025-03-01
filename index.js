document.addEventListener('DOMContentLoaded', () => {
    const createBtn = document.getElementById('createBtn');
    const generatorSection = document.querySelector('.generator-section');
    const shareSection = document.querySelector('.share-section');
    const generateBtn = document.getElementById('generateBtn');
    
    createBtn.addEventListener('click', () => {
        generatorSection.classList.remove('hidden');
        createBtn.classList.add('hidden');
    });

    generateBtn.addEventListener('click', async () => {
        const prompt = document.querySelector('textarea').value;
        if (!prompt.trim()) {
            alert('Please describe your video idea');
            return;
        }

        generateBtn.disabled = true;
        generateBtn.textContent = 'Generating...';

        try {
            // TODO: Implement API call to video generation service
            await mockVideoGeneration();
            shareSection.classList.remove('hidden');
        } catch (error) {
            alert('Error generating video. Please try again.');
        } finally {
            generateBtn.disabled = false;
            generateBtn.textContent = 'Generate Video';
        }
    });

    // Social sharing
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const platform = e.currentTarget.classList[1];
            shareContent(platform);
        });
    });
});

function mockVideoGeneration() {
    return new Promise(resolve => setTimeout(resolve, 2000));
}

function shareContent(platform) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Check out this AI-generated video!');
    let shareUrl;

    switch(platform) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
            break;
        case 'reddit':
            shareUrl = `https://reddit.com/submit?url=${url}&title=${text}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            break;
        case 'instagram':
            alert('Copy your video link to share on Instagram');
            return;
    }

    if (shareUrl) {
        window.open(shareUrl, '_blank');
    }
}