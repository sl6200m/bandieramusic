document.addEventListener('DOMContentLoaded', function() {
    // Sample data for releases (in a real app, this would come from an API)
    const releasesData = [
        {
            id: 1,
            artist: "Marco Faraone",
            title: "Apollo",
            year: 2023,
            cover: "images/releases/release1.jpg",
            featured: true
        },
        {
            id: 2,
            artist: "Alessandro Grops",
            title: "Terra EP",
            year: 2023,
            cover: "images/releases/release2.jpg"
        },
        {
            id: 3,
            artist: "Luigi Madonna",
            title: "The Silence",
            year: 2022,
            cover: "images/releases/release3.jpg"
        },
        {
            id: 4,
            artist: "Roberto Capuano",
            title: "The Journey",
            year: 2022,
            cover: "images/releases/release4.jpg"
        },
        {
            id: 5,
            artist: "Dino Maggiorana",
            title: "Frequencies",
            year: 2022,
            cover: "images/releases/release5.jpg"
        },
        {
            id: 6,
            artist: "Marco Faraone",
            title: "Cosmic Dust",
            year: 2021,
            cover: "images/releases/release6.jpg"
        },
        {
            id: 7,
            artist: "Alessandro Grops",
            title: "Solar Wind",
            year: 2021,
            cover: "images/releases/release7.jpg"
        },
        {
            id: 8,
            artist: "Luigi Madonna",
            title: "The Light",
            year: 2021,
            cover: "images/releases/release8.jpg"
        }
    ];

    // Sample data for artists
    const artistsData = [
        {
            id: 1,
            name: "Marco Faraone",
            avatar: "images/artists/artist1.jpg"
        },
        {
            id: 2,
            name: "Alessandro Grops",
            avatar: "images/artists/artist2.jpg"
        },
        {
            id: 3,
            name: "Luigi Madonna",
            avatar: "images/artists/artist3.jpg"
        },
        {
            id: 4,
            name: "Roberto Capuano",
            avatar: "images/artists/artist4.jpg"
        },
        {
            id: 5,
            name: "Dino Maggiorana",
            avatar: "images/artists/artist5.jpg"
        }
    ];

    // DOM Elements
    const releasesGrid = document.querySelector('.releases-grid');
    const artistsGrid = document.querySelector('.artists-grid');
    const sortSelect = document.getElementById('sort-releases');
    const prevPageBtn = document.querySelector('.prev-page');
    const nextPageBtn = document.querySelector('.next-page');
    const pageInfo = document.querySelector('.page-info');
    const searchInput = document.querySelector('.search-container input');
    const searchBtn = document.querySelector('.search-container button');

    // Pagination variables
    let currentPage = 1;
    const releasesPerPage = 8;
    let filteredReleases = [...releasesData];

    // Initialize the page
    function init() {
        renderReleases();
        renderArtists();
        setupEventListeners();
        applyInitialAnimations();
    }

    // Render releases to the grid
    function renderReleases() {
        releasesGrid.innerHTML = '';
        
        // Calculate pagination
        const startIndex = (currentPage - 1) * releasesPerPage;
        const endIndex = startIndex + releasesPerPage;
        const paginatedReleases = filteredReleases.slice(startIndex, endIndex);
        
        // Update page info
        const totalPages = Math.ceil(filteredReleases.length / releasesPerPage);
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
        
        // Disable/enable pagination buttons
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
        
        // Create release cards
        paginatedReleases.forEach((release, index) => {
            const releaseCard = document.createElement('div');
            releaseCard.className = `release-card fade-in delay-${index % 5}`;
            
            if (release.featured) {
                releaseCard.classList.add('featured');
            }
            
            releaseCard.innerHTML = `
                <img src="${release.cover}" alt="${release.title}" class="release-cover">
                <div class="release-info">
                    <div class="release-artist">${release.artist}</div>
                    <div class="release-title">${release.title}</div>
                    <div class="release-year">${release.year}</div>
                </div>
            `;
            
            releasesGrid.appendChild(releaseCard);
        });
    }

    // Render artists to the grid
    function renderArtists() {
        artistsGrid.innerHTML = '';
        
        artistsData.forEach((artist, index) => {
            const artistCard = document.createElement('div');
            artistCard.className = `artist-card slide-up delay-${index % 5}`;
            
            artistCard.innerHTML = `
                <img src="${artist.avatar}" alt="${artist.name}" class="artist-avatar">
                <div class="artist-name">${artist.name}</div>
            `;
            
            artistsGrid.appendChild(artistCard);
        });
    }

    // Sort releases based on selected option
    function sortReleases(sortBy) {
        switch(sortBy) {
            case 'newest':
                filteredReleases.sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
                break;
            case 'oldest':
                filteredReleases.sort((a, b) => a.year - b.year || a.title.localeCompare(b.title));
                break;
            case 'title':
                filteredReleases.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'artist':
                filteredReleases.sort((a, b) => a.artist.localeCompare(b.artist) || a.year - b.year);
                break;
            default:
                filteredReleases.sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
        }
        
        currentPage = 1;
        renderReleases();
    }

    // Filter releases based on search query
    function filterReleases(query) {
        if (!query) {
            filteredReleases = [...releasesData];
        } else {
            const lowerQuery = query.toLowerCase();
            filteredReleases = releasesData.filter(release => 
                release.artist.toLowerCase().includes(lowerQuery) || 
                release.title.toLowerCase().includes(lowerQuery)
            );
        }
        
        currentPage = 1;
        renderReleases();
    }

    // Set up event listeners
    function setupEventListeners() {
        // Sort select change
        sortSelect.addEventListener('change', (e) => {
            sortReleases(e.target.value);
        });
        
        // Pagination buttons
        prevPageBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderReleases();
                window.scrollTo({ top: releasesGrid.offsetTop - 100, behavior: 'smooth' });
            }
        });
        
        nextPageBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(filteredReleases.length / releasesPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderReleases();
                window.scrollTo({ top: releasesGrid.offsetTop - 100, behavior: 'smooth' });
            }
        });
        
        // Search functionality
        searchBtn.addEventListener('click', () => {
            filterReleases(searchInput.value);
        });
        
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                filterReleases(searchInput.value);
            }
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Apply initial animations
    function applyInitialAnimations() {
        // Animate header elements
        const headerElements = document.querySelectorAll('.main-header > *');
        headerElements.forEach((el, index) => {
            el.classList.add('slide-up');
            el.style.animationDelay = `${index * 0.1}s`;
        });
        
        // Animate label info section
        const labelInfoElements = document.querySelectorAll('.label-info > *');
        labelInfoElements.forEach((el, index) => {
            el.classList.add('fade-in');
            el.style.animationDelay = `${index * 0.2}s`;
        });
        
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.release-card, .artist-card').forEach(card => {
            observer.observe(card);
        });
    }

    // Initialize the application
    init();
});