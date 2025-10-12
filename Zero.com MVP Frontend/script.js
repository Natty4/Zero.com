// Sample book data
const books = [
  // The Great Gatsby - Public Domain first edition cover
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "classics", price: 25, coverUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg/250px-The_Great_Gatsby_Cover_1925_Retouched.jpg" },
  // To Kill a Mockingbird - First edition cover (Public Domain in the US)
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", genre: "classics", price: 25, coverUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/4/47/To_Kill_a_Mockingbird.jpg/220px-To_Kill_a_Mockingbird.jpg" },
  // 1984 - Modern cover, using Open Library (OLID: OL21633512M)
  { id: 3, title: "1984", author: "George Orwell", genre: "fiction", price: 25, coverUrl: "https://covers.openlibrary.org/b/olid/OL21633512M-M.jpg" },
  // Pride and Prejudice - Public Domain first edition cover
  { id: 4, title: "Pride and Prejudice", author: "Jane Austen", genre: "classics", price: 25, coverUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/PrideandPrejudiceTitle.jpg/220px-PrideandPrejudiceTitle.jpg" },
  // The Catcher in the Rye - Common cover (using a placeholder due to strict copyright on most modern covers)
  { id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger", genre: "fiction", price: 25, coverUrl: "https://covers.openlibrary.org/b/isbn/9780316769174-M.jpg" }, 
  // Sapiens - Using Open Library (OLID: OL27196013M)
  { id: 6, title: "Sapiens", author: "Yuval Noah Harari", genre: "non-fiction", price: 25, coverUrl: "https://covers.openlibrary.org/b/olid/OL27196013M-M.jpg" },
  // Educated - Using Open Library (OLID: OL25757910M)
  { id: 7, title: "Educated", author: "Tara Westover", genre: "non-fiction", price: 25, coverUrl: "https://covers.openlibrary.org/b/olid/OL25757910M-M.jpg" },
  // The Midnight Library - Using Open Library (OLID: OL27670747M)
  { id: 8, title: "The Midnight Library", author: "Matt Haig", genre: "contemporary", price: 25, coverUrl: "https://covers.openlibrary.org/b/olid/OL27670747M-M.jpg" },
  // Where the Crawdads Sing - Using Open Library (OLID: OL26533924M)
  { id: 9, title: "Where the Crawdads Sing", author: "Delia Owens", genre: "contemporary", price: 25, coverUrl: "https://covers.openlibrary.org/b/olid/OL26533924M-M.jpg" },
  // Atomic Habits - Using Open Library (OLID: OL26591784M)
  { id: 10, title: "Atomic Habits", author: "James Clear", genre: "non-fiction", price: 25, coverUrl: "https://covers.openlibrary.org/b/olid/OL26591784M-M.jpg" },
  // The Silent Patient - Using Open Library (OLID: OL27204996M)
  { id: 11, title: "The Silent Patient", author: "Alex Michaelides", genre: "fiction", price: 25, coverUrl: "https://covers.openlibrary.org/b/olid/OL27204996M-M.jpg" },
  // Becoming - Using Open Library (OLID: OL27233261M)
  { id: 12, title: "Becoming", author: "Michelle Obama", genre: "non-fiction", price: 25, coverUrl: "https://covers.openlibrary.org/b/olid/OL27233261M-M.jpg" },
]

// Cart state
let cart = []

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    renderBooks("all")
    renderBookGrid()
    setupEventListeners()
    animateStats()
    setupScrollAnimations()
    setupTiltEffect()
})

// Render books in main section
function renderBooks(filter) {
    const container = document.getElementById("booksContainer")
    const filteredBooks = filter === "all" ? books : books.filter((book) => book.genre === filter)

    container.innerHTML = filteredBooks
        .map(
            (book) => `
                <div class="book-card" data-book-id="${book.id}">
                    <div class="book-cover">
                        <img src="${book.coverUrl}" alt="Cover for ${book.title}">
                    </div>
                    <div class="book-info">
                        <h3>${book.title}</h3>
                        <p class="book-author">${book.author}</p>
                        <span class="book-genre">${book.genre}</span>
                        <div class="book-footer">
                            <span class="book-price">${book.price} Birr</span>
                            <button class="add-to-cart-btn" onclick="addToCart(${book.id})">Add</button>
                        </div>
                    </div>
                </div>
        `,
        )
        .join("")
}

// Render book grid in bento section
function renderBookGrid() {
    const grid = document.getElementById("bookGrid")
    const featuredBooks = books.slice(0, 6)

    grid.innerHTML = featuredBooks
        .map(
            (book) => `
                <div class="book-card-mini" title="${book.title}">
                    <img src="${book.coverUrl}" alt="Cover for ${book.title}">
                </div>
        `,
        )
        .join("")
}

// Add to cart
function addToCart(bookId) {
    const book = books.find((b) => b.id === bookId)
    if (book && !cart.find((item) => item.id === bookId)) {
        cart.push(book)
        updateCart()
        showNotification("Book added to cart!")
    }
}

// Remove from cart
function removeFromCart(bookId) {
    cart = cart.filter((item) => item.id !== bookId)
    updateCart()
}

// Update cart display
function updateCart() {
    const cartCount = document.getElementById("cartCount")
    const cartItems = document.getElementById("cartItems")
    const cartTotal = document.getElementById("cartTotal")

    cartCount.textContent = cart.length

    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>'
        cartTotal.textContent = "0 Birr"
        return
    }

    cartItems.innerHTML = cart
        .map(
            (book) => `
                <div class="cart-item">
                    <div class="cart-item-cover">
                        <img src="${book.coverUrl}" alt="Cover for ${book.title}">
                    </div>
                    <div class="cart-item-info">
                        <h3>${book.title}</h3>
                        <p class="cart-item-author">${book.author}</p>
                        <p class="cart-item-price">${book.price} Birr</p>
                        <button class="remove-btn" onclick="removeFromCart(${book.id})">Remove</button>
                    </div>
                </div>
        `,
        )
        .join("")

    const total = cart.reduce((sum, book) => sum + book.price, 0)
    cartTotal.textContent = `${total} Birr`
}

// Setup event listeners
function setupEventListeners() {
    // Cart modal
    const cartBtn = document.getElementById("cartBtn")
    const cartModal = document.getElementById("cartModal")
    const closeCart = document.getElementById("closeCart")

    cartBtn.addEventListener("click", () => {
        cartModal.classList.add("active")
    })

    closeCart.addEventListener("click", () => {
        cartModal.classList.remove("active")
    })

    cartModal.addEventListener("click", (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove("active")
        }
    })

    // Filter buttons
    const filterBtns = document.querySelectorAll(".filter-btn")
    filterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            filterBtns.forEach((b) => b.classList.remove("active"))
            btn.classList.add("active")
            const filter = btn.getAttribute("data-filter")
            renderBooks(filter)
        })
    })

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault()
            const target = document.querySelector(this.getAttribute("href"))
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" })
            }
        })
    })
}

// Animate stats counter
function animateStats() {
    const statNumber = document.querySelector(".stat-number")
    if (!statNumber) return

    const target = Number.parseInt(statNumber.getAttribute("data-count"))
    let current = 0
    const increment = target / 50

    const timer = setInterval(() => {
        current += increment
        if (current >= target) {
            statNumber.textContent = target
            clearInterval(timer)
        } else {
            statNumber.textContent = Math.floor(current)
        }
    }, 30)
}

// Scroll animations
function setupScrollAnimations() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("aos-animate")
                }
            })
        },
        { threshold: 0.1 },
    )

    document.querySelectorAll("[data-aos]").forEach((el) => {
        observer.observe(el)
    })
}

// Tilt effect for cards
function setupTiltEffect() {
    const cards = document.querySelectorAll("[data-tilt]")

    cards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top

            const centerX = rect.width / 2
            const centerY = rect.height / 2

            const rotateX = (y - centerY) / 10
            const rotateY = (centerX - x) / 10

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
        })

        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"
        })
    })
}

// Show notification
function showNotification(message) {
    const notification = document.createElement("div")
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: rgba(255, 140, 0, 0.9);
        backdrop-filter: blur(20px);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        font-weight: 600;
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `
    notification.textContent = message
    document.body.appendChild(notification)

    setTimeout(() => {
        notification.style.animation = "slideOut 0.3s ease"
        setTimeout(() => notification.remove(), 300)
    }, 2000)
}

// Add animation keyframes
const style = document.createElement("style")
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)