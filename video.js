document.addEventListener('DOMContentLoaded', function() {
    // Display current date
    displayCurrentDate();
    
    // Get user email from storage
    displayUserEmail();
    
    // Initialize videos
    loadVideos();
    
    // Setup event listeners
    setupEventListeners();
});

// Display current date in the format: Monday, March 1, 2025
function displayCurrentDate() {
    const dateElement = document.getElementById('current-date');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const currentDate = new Date().toLocaleDateString('en-US', options);
    dateElement.textContent = currentDate;
}

// Display user email from session storage or local storage
function displayUserEmail() {
    const userEmailElement = document.getElementById('user-email');
    
    // Check URL parameters first (passed from sign-in page)
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get('email');
    
    if (emailParam) {
        userEmailElement.textContent = emailParam;
        // Save to session storage for persistence during this session
        sessionStorage.setItem('userEmail', emailParam);
        return;
    }
    
    // Try to get from session storage or local storage
    let userEmail = sessionStorage.getItem('userEmail') || localStorage.getItem('userEmail');
    
    // If still not found, use a default
    if (!userEmail) {
        userEmail = 'user@example.com';
    }
    
    userEmailElement.textContent = userEmail;
}

// Sample video data - in a real app, this would come from an API
const sampleVideos = [
    {
        id: 1,
        title: 'Product Explainer Animation',
        thumbnail: 'https://via.placeholder.com/300x169',
        duration: '00:45',
        date: '2025-03-01',
        size: '12.5 MB'
    },
    {
        id: 2,
        title: 'Company Introduction',
        thumbnail: 'https://via.placeholder.com/300x169',
        duration: '01:30',
        date: '2025-02-28',
        size: '24.8 MB'
    },
    {
        id: 3,
        title: 'Social Media Ad',
        thumbnail: 'https://via.placeholder.com/300x169',
        duration: '00:15',
        date: '2025-02-25',
        size: '5.2 MB'
    },
    {
        id: 4,
        title: 'Educational Tutorial',
        thumbnail: 'https://via.placeholder.com/300x169',
        duration: '03:25',
        date: '2025-02-20',
        size: '42.1 MB'
    },
    {
        id: 5,
        title: 'Product Demo',
        thumbnail: 'https://via.placeholder.com/300x169',
        duration: '01:15',
        date: '2025-02-15',
        size: '18.7 MB'
    },
    {
        id: 6,
        title: 'Promotional Video',
        thumbnail: 'https://via.placeholder.com/300x169',
        duration: '00:30',
        date: '2025-02-10',
        size: '9.3 MB'
    }
];

// Load videos into the container
function loadVideos(filterTerm = '', sortOption = 'date-desc') {
    const videosContainer = document.getElementById('videos-container');
    const emptyState = document.getElementById('empty-state');
    
    // Filter videos based on search term
    let filteredVideos = sampleVideos.filter(video => {
        return video.title.toLowerCase().includes(filterTerm.toLowerCase());
    });
    
    // Sort videos based on selected option
    filteredVideos = sortVideos(filteredVideos, sortOption);
    
    // Clear current videos
    videosContainer.innerHTML = '';
    
    // Show empty state if no videos
    if (filteredVideos.length === 0) {
        emptyState.classList.remove('hidden');
        document.getElementById('pagination').classList.add('hidden');
    } else {
        emptyState.classList.add('hidden');
        document.getElementById('pagination').classList.remove('hidden');
        
        // Render videos
        filteredVideos.forEach(video => {
            const videoCard = createVideoCard(video);
            videosContainer.appendChild(videoCard);
        });
        
        // Update pagination
        updatePagination(filteredVideos.length);
    }
}

// Create a video card element
function createVideoCard(video) {
    const isGridView = document.getElementById('videos-container').classList.contains('grid-view');
    
    const videoCard = document.createElement('div');
    videoCard.className = 'video-card';
    videoCard.setAttribute('data-id', video.id);
    
    const thumbnailDiv = document.createElement('div');
    thumbnailDiv.className = 'video-thumbnail';
    
    const img = document.createElement('img');
    img.src = video.thumbnail;
    img.alt = video.title;
    thumbnailDiv.appendChild(img);
    
    const durationDiv = document.createElement('div');
    durationDiv.className = 'video-duration';
    durationDiv.textContent = video.duration;
    thumbnailDiv.appendChild(durationDiv);
    
    const infoDiv = document.createElement('div');
    infoDiv.className = 'video-info';
    
    const title = document.createElement('div');
    title.className = 'video-title';
    title.textContent = video.title;
    
    const meta = document.createElement('div');
    meta.className = 'video-meta';
    
    const date = document.createElement('span');
    date.textContent = formatDate(video.date);
    
    const size = document.createElement('span');
    size.textContent = video.size;
    
    meta.appendChild(date);
    meta.appendChild(size);
    
    infoDiv.appendChild(title);
    infoDiv.appendChild(meta);
    
    videoCard.appendChild(thumbnailDiv);
    videoCard.appendChild(infoDiv);
    
    // Add action buttons for list view
    if (!isGridView) {
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'video-actions';
        
        const editBtn = createActionButton('Edit', 'edit');
        const shareBtn = createActionButton('Share', 'share-alt');
        const downloadBtn = createActionButton('Download', 'download');
        const deleteBtn = createActionButton('Delete', 'trash');
        
        actionsDiv.appendChild(editBtn);
        actionsDiv.appendChild(shareBtn);
        actionsDiv.appendChild(downloa