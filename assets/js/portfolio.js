/**
 * Blog JavaScript Module
 * Handles blog posts about sales learning journey
 */

// Blog posts data structure - Journey focused
const blogPostsData = [
    {
        id: 1,
        title: "My First Month Learning Sales: What I Wish I Knew",
        excerpt: "The honest truth about starting from zero and the mindset shifts that made all the difference.",
        content: "Starting my sales journey was intimidating. Here's what I learned in my first 30 days...",
        date: "2025-01-15",
        readTime: "5 min read",
        category: "Beginner Tips",
        image: "assets/images/blog-first-month.jpg",
        tags: ["Beginner", "Mindset", "Learning"],
        featured: true,
        slug: "first-month-learning-sales"
    },
    {
        id: 2,
        title: "From Fear to Confidence: My First Sales Call Story",
        excerpt: "How I went from terrified of rejection to actually enjoying conversations with prospects.",
        content: "I'll never forget my first real sales call. My hands were shaking, my voice was trembling...",
        date: "2025-01-10",
        readTime: "4 min read",
        category: "Personal Growth",
        image: "assets/images/blog-first-call.jpg",
        tags: ["Fear", "Confidence", "First Call"],
        featured: true,
        slug: "fear-to-confidence"
    },
    {
        id: 3,
        title: "The Sales Course That Changed My Life: Honest Review",
        excerpt: "A complete breakdown of the training program that took me from beginner to confident closer.",
        content: "After researching dozens of sales courses, I found the one that actually delivered results...",
        date: "2025-01-05",
        readTime: "8 min read",
        category: "Course Review",
        image: "assets/images/blog-course-review.jpg",
        tags: ["Course Review", "Training", "Education"],
        featured: true,
        slug: "sales-course-review",
        affiliate: true,
        affiliateLink: "https://hotmart.com/course-link" // This would be the actual Hotmart link
    },
    {
        id: 4,
        title: "Rejection Doesn't Have to Hurt: What I Learned",
        excerpt: "How I reframed rejection and turned it into a learning opportunity that accelerated my growth.",
        content: "Getting told 'no' used to ruin my day. Here's how I completely changed my perspective...",
        date: "2024-12-28",
        readTime: "6 min read",
        category: "Mindset",
        image: "assets/images/blog-rejection.jpg",
        tags: ["Rejection", "Mindset", "Growth"],
        featured: false,
        slug: "rejection-mindset"
    },
    {
        id: 5,
        title: "My First Launch Success: Behind the Scenes",
        excerpt: "The complete story of how I helped close my first product launch and what I learned along the way.",
        content: "This was it - my first real test. Everything I'd learned was about to be put to the test...",
        date: "2024-12-20",
        readTime: "7 min read",
        category: "Success Story",
        image: "assets/images/blog-first-win.jpg",
        tags: ["Success", "Launch", "Real Experience"],
        featured: true,
        slug: "first-launch-success"
    },
    {
        id: 6,
        title: "5 Books That Transformed My Sales Approach",
        excerpt: "The essential reading list that shaped my understanding of authentic, relationship-based selling.",
        content: "These books didn't just teach me techniques - they changed how I think about sales entirely...",
        date: "2024-12-15",
        readTime: "5 min read",
        category: "Resources",
        image: "assets/images/blog-books.jpg",
        tags: ["Books", "Resources", "Learning"],
        featured: false,
        slug: "sales-books-review",
        affiliate: true
    }
];
        title: "B2B Consulting Firm Scale-Up",
        description: "Helped a boutique consulting firm scale from 5 to 25 clients while increasing average deal size by 300% through premium positioning.",
        industry: "Professional Services",
        results: {
            clients: "25 clients",
            dealSize: "300% increase",
            retention: "95%",
            timeline: "6 months"
        },
        image: "assets/images/case-consulting.jpg",
        tags: ["B2B", "Consulting", "Premium Positioning", "Client Retention"],
        challenges: "Limited capacity, price competition, commoditized services",
        solution: "Repositioned as premium specialist, created authority content, developed referral systems",
        type: "scale-up",
        featured: true
    },
    {
        id: 4,
        title: "Real Estate Team Optimization",
        description: "Optimized sales processes for a real estate team, increasing per-agent productivity by 200% and reducing sales cycle by 40%.",
        industry: "Real Estate",
        results: {
            productivity: "200% increase",
            cycle: "40% reduction",
            commission: "$150K+ per agent",
            satisfaction: "98% client"
        },
        image: "assets/images/case-realestate.jpg",
        tags: ["Real Estate", "Team Training", "Process Optimization", "CRM"],
        challenges: "Long sales cycles, complex transactions, agent burnout",
        solution: "Streamlined qualification process, implemented CRM system, created follow-up automation",
        type: "optimization",
        featured: false
    },
    {
        id: 5,
        title: "Healthcare Technology Rollout",
        description: "Led sales strategy for healthcare technology rollout across 50+ medical practices, achieving 85% adoption rate and $2M in contracts.",
        industry: "Healthcare",
        results: {
            adoption: "85% rate",
            contracts: "$2M value",
            practices: "50+ locations",
            timeline: "12 months"
        },
        image: "assets/images/case-healthcare.jpg",
        tags: ["Healthcare", "Technology", "B2B Sales", "Large Scale"],
        challenges: "Regulatory compliance, decision committee complexity, long approval processes",
        solution: "Developed multi-stakeholder approach, created compliance documentation, established champion networks",
        type: "enterprise",
        featured: false
    },
    {
        id: 6,
        title: "Digital Marketing Agency Growth",
        description: "Transformed digital marketing agency's sales approach, increasing client LTV by 250% and reducing churn to under 5%.",
        industry: "Marketing",
        results: {
            ltv: "250% increase",
            churn: "Under 5%",
            retention: "18 months avg",
            revenue: "$300K MRR"
        },
        image: "assets/images/case-agency.jpg",
        tags: ["Digital Marketing", "Client Retention", "LTV", "Recurring Revenue"],
        challenges: "High client churn, price objections, service commoditization",
        solution: "Implemented value demonstration framework, created success metrics dashboard, developed upsell strategies",
        type: "retention",
        featured: false
    }
];

/**
 * Initialize Case Studies Module
 */
function initializeCaseStudies() {
    renderCaseStudyItems();
    setupCaseStudyFiltering();
    setupCaseStudyModal();
}

/**
 * Render case study items to the DOM
 * @param {Array} items - Array of case study items to render
 */
function renderCaseStudyItems(items = caseStudiesData) {
    const projectsGrid = document.querySelector('.projects-grid');
    
    if (!projectsGrid) return;
    
    // Clear existing items
    projectsGrid.innerHTML = '';
    
    // Render new items
    items.forEach(item => {
        const caseStudyElement = createCaseStudyElement(item);
        projectsGrid.appendChild(caseStudyElement);
    });
    
    // Setup intersection observer for new items
    setupCaseStudyAnimations();
}

/**
 * Create a case study item element
 * @param {Object} item - Case study item data
 * @returns {HTMLElement} - Case study item element
 */
function createCaseStudyElement(item) {
    const caseStudyItem = document.createElement('div');
    caseStudyItem.className = 'case-study-item';
    caseStudyItem.setAttribute('data-id', item.id);
    caseStudyItem.setAttribute('data-type', item.type);
    
    // Get primary result for display
    const primaryResult = Object.values(item.results)[0];
    const primaryLabel = Object.keys(item.results)[0];
    
    caseStudyItem.innerHTML = `
        <div class="case-study-header">
            <div class="case-study-image">
                <img src="${item.image}" alt="${item.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="case-study-placeholder" style="display: none; height: 200px; background: linear-gradient(135deg, var(--primary-color), var(--primary-light)); align-items: center; justify-content: center; color: white;">
                    <i class="fas fa-chart-line" style="font-size: 3rem;"></i>
                </div>
                <div class="case-study-overlay">
                    <button class="case-study-btn view-btn" data-id="${item.id}" title="View Case Study">
                        <i class="fas fa-eye"></i>
                    </button>
                    <div class="industry-tag">${item.industry}</div>
                </div>
            </div>
        </div>
        <div class="case-study-content">
            <h3 class="case-study-title">${item.title}</h3>
            <p class="case-study-description">${item.description}</p>
            
            <div class="case-study-results">
                <div class="result-highlight">
                    <span class="result-value">${primaryResult}</span>
                    <span class="result-label">${primaryLabel.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
                </div>
            </div>
            
            <div class="case-study-tags">
                ${item.tags.slice(0, 3).map(tag => `<span class="case-study-tag">${tag}</span>`).join('')}
                ${item.tags.length > 3 ? '<span class="case-study-tag more">+' + (item.tags.length - 3) + ' more</span>' : ''}
            </div>
        </div>
    `;
    
    return caseStudyItem;
}

/**
 * Setup case study filtering functionality
 */
function setupCaseStudyFiltering() {
    // Create filter buttons if they don't exist
    createCaseStudyFilterButtons();
    
    const filterButtons = document.querySelectorAll('.case-study-filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter and render items
            const filteredItems = filterCaseStudyItems(filter);
            renderCaseStudyItems(filteredItems);
        });
    });
}

/**
 * Create filter buttons for case studies
 */
function createCaseStudyFilterButtons() {
    const projectsSection = document.querySelector('.projects');
    const existingFilters = document.querySelector('.case-study-filters');
    
    if (!projectsSection || existingFilters) return;
    
    const filtersContainer = document.createElement('div');
    filtersContainer.className = 'case-study-filters';
    filtersContainer.style.cssText = `
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 3rem;
        flex-wrap: wrap;
    `;
    
    const filters = [
        { label: 'All Cases', value: 'all' },
        { label: 'Revenue Growth', value: 'revenue-growth' },
        { label: 'Product Launches', value: 'product-launch' },
        { label: 'Scale-Up', value: 'scale-up' },
        { label: 'Enterprise', value: 'enterprise' }
    ];
    
    filters.forEach((filter, index) => {
        const button = document.createElement('button');
        button.className = `case-study-filter-btn ${index === 0 ? 'active' : ''}`;
        button.setAttribute('data-filter', filter.value);
        button.textContent = filter.label;
        button.style.cssText = `
            padding: 10px 24px;
            border: 2px solid var(--primary-color);
            background-color: ${index === 0 ? 'var(--primary-color)' : 'transparent'};
            color: ${index === 0 ? 'var(--white)' : 'var(--primary-color)'};
            border-radius: 30px;
            cursor: pointer;
            transition: var(--transition);
            font-weight: var(--font-weight-semibold);
            font-size: var(--font-size-sm);
        `;
        
        filtersContainer.appendChild(button);
    });
    
    // Insert filters before projects grid
    const projectsGrid = document.querySelector('.projects-grid');
    projectsSection.querySelector('.container').insertBefore(filtersContainer, projectsGrid);
    
    // Add hover styles
    const style = document.createElement('style');
    style.textContent = `
        .case-study-filter-btn:hover {
            background-color: var(--primary-color);
            color: var(--white);
            transform: translateY(-2px);
            box-shadow: var(--shadow-md);
        }
        
        .case-study-filter-btn.active {
            background-color: var(--primary-color);
            color: var(--white);
            box-shadow: var(--shadow-md);
        }
    `;
    if (!document.querySelector('#case-study-filter-styles')) {
        style.id = 'case-study-filter-styles';
        document.head.appendChild(style);
    }
}

/**
 * Filter portfolio items based on criteria
 * @param {string} filter - Filter criteria
 * @returns {Array} - Filtered portfolio items
 */
function filterPortfolioItems(filter) {
    if (filter === 'all') {
        return portfolioData;
    }
    
    if (filter === 'featured') {
        return portfolioData.filter(item => item.featured);
    }
    
    return portfolioData.filter(item => 
        item.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase()))
    );
}

/**
 * Setup portfolio modal for detailed view
 */
function setupPortfolioModal() {
    // Create modal if it doesn't exist
    createPortfolioModal();
    
    // Event delegation for view buttons
    document.addEventListener('click', function(event) {
        if (event.target.closest('.view-btn')) {
            const projectId = parseInt(event.target.closest('.view-btn').getAttribute('data-id'));
            const project = portfolioData.find(item => item.id === projectId);
            
            if (project) {
                showPortfolioModal(project);
            }
        }
        
        if (event.target.closest('.modal-close') || event.target.classList.contains('portfolio-modal')) {
            closePortfolioModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closePortfolioModal();
        }
    });
}

/**
 * Create portfolio modal structure
 */
function createPortfolioModal() {
    const existingModal = document.querySelector('.portfolio-modal');
    if (existingModal) return;
    
    const modal = document.createElement('div');
    modal.className = 'portfolio-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 20px;
    `;
    
    modal.innerHTML = `
        <div class="modal-content" style="
            background: white;
            border-radius: 12px;
            max-width: 800px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
        ">
            <button class="modal-close" style="
                position: absolute;
                top: 20px;
                right: 20px;
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #666;
                z-index: 1001;
            ">&times;</button>
            <div class="modal-body">
                <!-- Content will be populated dynamically -->
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

/**
 * Show portfolio modal with project details
 * @param {Object} project - Project data
 */
function showPortfolioModal(project) {
    const modal = document.querySelector('.portfolio-modal');
    const modalBody = modal.querySelector('.modal-body');
    
    modalBody.innerHTML = `
        <div class="modal-image" style="height: 300px; background-color: #f8f9fa; display: flex; align-items: center; justify-content: center; color: #6c757d; border-radius: 12px 12px 0 0;">
            <i class="fas fa-image" style="font-size: 4rem;"></i>
        </div>
        <div class="modal-info" style="padding: 2rem;">
            <h2 style="margin-bottom: 1rem; color: var(--dark-color);">${project.title}</h2>
            <p style="margin-bottom: 1.5rem; color: var(--text-light); line-height: 1.6;">${project.description}</p>
            <div class="modal-tags" style="margin-bottom: 2rem;">
                ${project.tags.map(tag => `<span class="portfolio-tag" style="margin-right: 0.5rem; margin-bottom: 0.5rem; display: inline-block;">${tag}</span>`).join('')}
            </div>
            <div class="modal-actions" style="display: flex; gap: 1rem;">
                ${project.liveUrl !== '#' ? `
                    <a href="${project.liveUrl}" target="_blank" class="btn btn-primary">
                        <i class="fas fa-external-link-alt"></i> Live Demo
                    </a>
                ` : ''}
                ${project.githubUrl !== '#' ? `
                    <a href="${project.githubUrl}" target="_blank" class="btn btn-secondary">
                        <i class="fab fa-github"></i> View Code
                    </a>
                ` : ''}
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

/**
 * Close portfolio modal
 */
function closePortfolioModal() {
    const modal = document.querySelector('.portfolio-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

/**
 * Setup animations for portfolio items
 */
function setupPortfolioAnimations() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Add portfolio overlay styles
    const style = document.createElement('style');
    style.textContent = `
        .portfolio-image {
            position: relative;
            overflow: hidden;
            border-radius: 8px 8px 0 0;
        }
        
        .portfolio-image img {
            width: 100%;
            height: 200px;
            object-fit: cover;
            transition: transform 0.3s ease;
        }
        
        .portfolio-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 123, 255, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .portfolio-item:hover .portfolio-overlay {
            opacity: 1;
        }
        
        .portfolio-item:hover .portfolio-image img {
            transform: scale(1.1);
        }
        
        .portfolio-actions {
            display: flex;
            gap: 1rem;
        }
        
        .portfolio-btn {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: white;
            color: var(--primary-color);
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            transition: transform 0.2s ease;
            border: none;
            cursor: pointer;
            font-size: 18px;
        }
        
        .portfolio-btn:hover {
            transform: scale(1.1);
        }
    `;
    
    // Only add styles if they don't exist
    if (!document.querySelector('#portfolio-styles')) {
        style.id = 'portfolio-styles';
        document.head.appendChild(style);
    }
}

// Initialize portfolio when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});
