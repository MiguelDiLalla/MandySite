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

/**
 * Initialize Blog Module
 */
function initializeBlog() {
    renderBlogPosts();
    setupBlogFiltering();
    setupBlogAnimations();
}

/**
 * Render blog posts to the DOM
 * @param {Array} posts - Array of blog posts to render
 */
function renderBlogPosts(posts = blogPostsData) {
    const blogGrid = document.querySelector('.blog-grid');
    
    if (!blogGrid) return;
    
    // Clear existing posts
    blogGrid.innerHTML = '';
    
    // Render featured posts first
    const featuredPosts = posts.filter(post => post.featured);
    const otherPosts = posts.filter(post => !post.featured);
    
    // Combine with featured first
    const sortedPosts = [...featuredPosts, ...otherPosts];
    
    // Render new posts
    sortedPosts.forEach(post => {
        const blogElement = createBlogPostElement(post);
        blogGrid.appendChild(blogElement);
    });
    
    // Setup intersection observer for new items
    setupBlogAnimations();
}

/**
 * Create a blog post element
 * @param {Object} post - Blog post data
 * @returns {HTMLElement} - Blog post element
 */
function createBlogPostElement(post) {
    const blogPost = document.createElement('article');
    blogPost.className = `blog-post ${post.featured ? 'featured' : ''}`;
    blogPost.setAttribute('data-id', post.id);
    blogPost.setAttribute('data-category', post.category.toLowerCase().replace(/\s+/g, '-'));
    
    // Format date
    const postDate = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    blogPost.innerHTML = `
        <div class="blog-post-header">
            <div class="blog-post-image">
                <img src="${post.image}" alt="${post.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="blog-post-placeholder" style="display: none; height: 200px; background: var(--gradient-sunset); align-items: center; justify-content: center; color: white;">
                    <i class="fas fa-pen-alt" style="font-size: 3rem;"></i>
                </div>
                ${post.featured ? '<div class="featured-badge"><i class="fas fa-star"></i> Featured</div>' : ''}
                ${post.affiliate ? '<div class="affiliate-badge"><i class="fas fa-tag"></i> Includes Links</div>' : ''}
            </div>
        </div>
        <div class="blog-post-content">
            <div class="blog-post-meta">
                <span class="blog-category">${post.category}</span>
                <span class="blog-date">${postDate}</span>
                <span class="blog-read-time"><i class="fas fa-clock"></i> ${post.readTime}</span>
            </div>
            
            <h3 class="blog-post-title">${post.title}</h3>
            <p class="blog-post-excerpt">${post.excerpt}</p>
            
            <div class="blog-post-tags">
                ${post.tags.slice(0, 3).map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
            </div>
            
            <div class="blog-post-actions">
                <button class="btn btn-primary read-more-btn" data-slug="${post.slug}">
                    <i class="fas fa-book-open"></i>
                    Read Full Post
                </button>
                ${post.affiliate ? '<span class="affiliate-note">Contains affiliate links</span>' : ''}
            </div>
        </div>
    `;
    
    return blogPost;
}

/**
 * Setup blog filtering functionality
 */
function setupBlogFiltering() {
    // Create filter buttons if they don't exist
    createBlogFilterButtons();
    
    const filterButtons = document.querySelectorAll('.blog-filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter and render posts
            const filteredPosts = filterBlogPosts(filter);
            renderBlogPosts(filteredPosts);
        });
    });
    
    // Setup read more functionality
    document.addEventListener('click', function(event) {
        if (event.target.closest('.read-more-btn')) {
            const slug = event.target.closest('.read-more-btn').getAttribute('data-slug');
            const post = blogPostsData.find(p => p.slug === slug);
            
            if (post) {
                showBlogPostModal(post);
            }
        }
    });
}

/**
 * Create filter buttons for blog posts
 */
function createBlogFilterButtons() {
    const blogSection = document.querySelector('.blog');
    const existingFilters = document.querySelector('.blog-filters');
    
    if (!blogSection || existingFilters) return;
    
    const filtersContainer = document.createElement('div');
    filtersContainer.className = 'blog-filters';
    filtersContainer.style.cssText = `
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 3rem;
        flex-wrap: wrap;
    `;
    
    const filters = [
        { label: 'All Posts', value: 'all' },
        { label: 'Beginner Tips', value: 'beginner-tips' },
        { label: 'Personal Growth', value: 'personal-growth' },
        { label: 'Course Reviews', value: 'course-review' },
        { label: 'Success Stories', value: 'success-story' }
    ];
    
    filters.forEach((filter, index) => {
        const button = document.createElement('button');
        button.className = `blog-filter-btn ${index === 0 ? 'active' : ''}`;
        button.setAttribute('data-filter', filter.value);
        button.textContent = filter.label;
        button.style.cssText = `
            padding: 10px 24px;
            border: 2px solid var(--primary-orange);
            background-color: ${index === 0 ? 'var(--primary-orange)' : 'transparent'};
            color: ${index === 0 ? 'var(--white)' : 'var(--primary-orange)'};
            border-radius: 30px;
            cursor: pointer;
            transition: var(--transition);
            font-weight: var(--font-weight-semibold);
            font-size: var(--font-size-sm);
        `;
        
        filtersContainer.appendChild(button);
    });
    
    // Insert filters before blog grid
    const blogGrid = document.querySelector('.blog-grid');
    const sectionHeader = blogSection.querySelector('.section-header');
    sectionHeader.parentNode.insertBefore(filtersContainer, blogGrid);
    
    // Add hover styles
    const style = document.createElement('style');
    style.textContent = `
        .blog-filter-btn:hover {
            background-color: var(--primary-orange);
            color: var(--white);
            transform: translateY(-2px);
            box-shadow: var(--shadow-md);
        }
        
        .blog-filter-btn.active {
            background-color: var(--primary-orange);
            color: var(--white);
            box-shadow: var(--shadow-md);
        }
        
        .blog-post {
            background: var(--white);
            border-radius: var(--border-radius-lg);
            box-shadow: var(--shadow-sm);
            overflow: hidden;
            transition: var(--transition);
            margin-bottom: 2rem;
        }
        
        .blog-post:hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow-lg);
        }
        
        .blog-post.featured {
            border: 2px solid var(--primary-orange);
        }
        
        .blog-post-image {
            position: relative;
            height: 200px;
            overflow: hidden;
        }
        
        .blog-post-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
        }
        
        .blog-post:hover .blog-post-image img {
            transform: scale(1.05);
        }
        
        .featured-badge, .affiliate-badge {
            position: absolute;
            top: 10px;
            right: 10px;
            background: var(--primary-orange);
            color: white;
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 12px;
            font-weight: 600;
        }
        
        .affiliate-badge {
            top: 40px;
            background: var(--accent-yellow);
            color: var(--deep-navy);
        }
        
        .blog-post-content {
            padding: 1.5rem;
        }
        
        .blog-post-meta {
            display: flex;
            gap: 1rem;
            margin-bottom: 1rem;
            font-size: var(--font-size-sm);
            color: var(--text-medium);
        }
        
        .blog-category {
            background: var(--gradient-sunset);
            color: white;
            padding: 4px 12px;
            border-radius: 12px;
            font-weight: 600;
        }
        
        .blog-post-title {
            margin-bottom: 0.75rem;
            color: var(--text-dark);
            font-size: var(--font-size-xl);
            font-weight: var(--font-weight-bold);
            line-height: 1.3;
        }
        
        .blog-post-excerpt {
            margin-bottom: 1rem;
            color: var(--text-medium);
            line-height: 1.6;
        }
        
        .blog-post-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 1.5rem;
        }
        
        .blog-tag {
            background: var(--light-gray);
            color: var(--text-dark);
            padding: 4px 10px;
            border-radius: 12px;
            font-size: var(--font-size-sm);
            font-weight: var(--font-weight-medium);
        }
        
        .blog-post-actions {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .affiliate-note {
            font-size: var(--font-size-xs);
            color: var(--text-light);
            font-style: italic;
        }
        
        .blog-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
        }
        
        @media (max-width: 768px) {
            .blog-grid {
                grid-template-columns: 1fr;
            }
            
            .blog-post-meta {
                flex-direction: column;
                gap: 0.5rem;
            }
        }
    `;
    if (!document.querySelector('#blog-styles')) {
        style.id = 'blog-styles';
        document.head.appendChild(style);
    }
}

/**
 * Filter blog posts based on criteria
 * @param {string} filter - Filter criteria
 * @returns {Array} - Filtered blog posts
 */
function filterBlogPosts(filter) {
    if (filter === 'all') {
        return blogPostsData;
    }
    
    return blogPostsData.filter(post => 
        post.category.toLowerCase().replace(/\s+/g, '-') === filter
    );
}

/**
 * Show blog post modal with full content
 * @param {Object} post - Blog post data
 */
function showBlogPostModal(post) {
    // Create modal if it doesn't exist
    let modal = document.querySelector('.blog-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.className = 'blog-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 20px;
        `;
        document.body.appendChild(modal);
    }
    
    // Format date
    const postDate = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
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
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            ">&times;</button>
            
            <div class="modal-header" style="
                height: 200px;
                background: var(--gradient-sunset);
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 12px 12px 0 0;
            ">
                <div style="text-align: center; padding: 2rem;">
                    <div style="margin-bottom: 1rem;">
                        <span style="background: rgba(255,255,255,0.2); padding: 5px 15px; border-radius: 20px; font-size: 14px;">${post.category}</span>
                        <span style="margin-left: 10px; font-size: 14px;"><i class="fas fa-clock"></i> ${post.readTime}</span>
                    </div>
                    <h2 style="margin: 0; font-size: 2rem; line-height: 1.2;">${post.title}</h2>
                    <p style="margin: 10px 0 0 0; opacity: 0.9;">${postDate}</p>
                </div>
            </div>
            
            <div class="modal-body" style="padding: 2rem;">
                <div style="margin-bottom: 2rem;">
                    ${post.tags.map(tag => `<span style="background: var(--light-gray); color: var(--text-dark); padding: 5px 12px; border-radius: 15px; margin-right: 8px; font-size: 14px;">${tag}</span>`).join('')}
                </div>
                
                <div style="line-height: 1.8; color: var(--text-dark); font-size: 16px;">
                    <p>${post.content}</p>
                    <p>This is where the full blog post content would appear. In a real implementation, you would store the complete article content and render it here.</p>
                    <p>The blog post would include detailed insights, personal experiences, and actionable tips for fellow sales learners.</p>
                    
                    ${post.affiliate ? `
                        <div style="background: var(--light-gray); padding: 1.5rem; border-radius: 12px; margin: 2rem 0; border-left: 4px solid var(--accent-yellow);">
                            <h4 style="color: var(--text-dark); margin-bottom: 1rem;"><i class="fas fa-info-circle"></i> Affiliate Disclosure</h4>
                            <p style="margin: 0; color: var(--text-medium); font-size: 14px;">This post contains affiliate links. If you purchase through these links, I may earn a commission at no extra cost to you. I only recommend products and services I personally use and believe in.</p>
                        </div>
                    ` : ''}
                    
                    ${post.affiliateLink ? `
                        <div style="text-align: center; margin: 2rem 0;">
                            <a href="${post.affiliateLink}" target="_blank" style="
                                display: inline-block;
                                background: var(--gradient-sunset);
                                color: white;
                                padding: 15px 30px;
                                border-radius: 30px;
                                text-decoration: none;
                                font-weight: 600;
                                transition: transform 0.3s ease;
                            " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                                <i class="fas fa-graduation-cap"></i> Check Out This Course
                            </a>
                        </div>
                    ` : ''}
                </div>
                
                <div style="border-top: 1px solid var(--border-light); padding-top: 2rem; margin-top: 2rem;">
                    <h4 style="color: var(--text-dark); margin-bottom: 1rem;">Share Your Thoughts</h4>
                    <p style="color: var(--text-medium); margin-bottom: 1.5rem;">Have you had similar experiences? I'd love to hear your story!</p>
                    <a href="#contact" style="
                        background: var(--primary-orange);
                        color: white;
                        padding: 12px 24px;
                        border-radius: 25px;
                        text-decoration: none;
                        font-weight: 600;
                    " onclick="closeModal()">
                        <i class="fas fa-envelope"></i> Get in Touch
                    </a>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Close modal functionality
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });
    
    // Close modal with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });
}

/**
 * Close blog modal
 */
function closeModal() {
    const modal = document.querySelector('.blog-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

/**
 * Setup animations for blog posts
 */
function setupBlogAnimations() {
    const blogPosts = document.querySelectorAll('.blog-post');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    blogPosts.forEach((post, index) => {
        post.style.opacity = '0';
        post.style.transform = 'translateY(30px)';
        post.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(post);
    });
}

// Initialize blog when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.blog-grid')) {
        initializeBlog();
    }
});

// Export functions for external use
window.blogModule = {
    initializeBlog,
    renderBlogPosts,
    blogPostsData
};
