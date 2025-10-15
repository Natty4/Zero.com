const swapBooks = [
  {
    id: 1,
    title: "The Theory of Everything",
    author: "Stephen Hawking",
    genre: "non-fiction",
    price: 25,
    zcoin: 46000,
    cover: "assets/the-theory-of-everything.png",
    type: "swap",
  },
  {
    id: 2,
    title: "Success From Anywhere",
    author: "Karen Mangia",
    genre: "classics",
    price: 25,
    zcoin: 39900,
    cover: "assets/success-from-anywhere.png",
    type: "swap",
  },
  {
    id: 3,
    title: "Promote Yourself to a Better Job",
    author: "Phillp Parrish",
    genre: "fiction",
    price: 25,
    zcoin: 21250,
    cover: "assets/promote-yourself-to-a-better-job.png",
    type: "swap",
  },
  {
    id: 4,
    title: "Prescription for Total Wealth",
    author: "Dr. Sanjoy Mukersit",
    genre: "classics",
    price: 25,
    zcoin: 92000,
    cover: "assets/prescription-for-total-wealth.png",
    type: "swap",
  },
  {
    id: 5,
    title: "Leningrad and its Environs",
    author: "J.D. Salinger",
    genre: "fiction",
    price: 25,
    zcoin: 94500,
    cover: "assets/leningrad-and-its-environs.png",
    type: "swap",
  },
  {
    id: 6,
    title: "Lead The Way Five Minutes A Day",
    author: "Jo Anna Preston",
    genre: "non-fiction",
    price: 25,
    zcoin: 42750,
    cover: "assets/lead-the-way-five-minutes-a-day.png",
    type: "swap",
  },
  {
    id: 7,
    title: "An Inside View",
    author: "Edward Boorstain",
    genre: "non-fiction",
    price: 25,
    zcoin: 63000,
    cover: "assets/an-inside-view.png",
    type: "swap",
  },
  {
    id: 8,
    title: "ውብ",
    author: "ደሴ አዳም",
    genre: "contemporary",
    price: 25,
    zcoin: 13586,
    cover: "assets/wib.png",
    type: "swap",
  },
  {
    id: 9,
    title: "የሱፍ አበባ",
    author: "ሃብታሙ አለማየሁ",
    genre: "fiction",
    price: 25,
    zcoin: 3836,
    cover: "assets/yesuf-abeba.png",
    type: "swap",
  },
  {
    id: 10,
    title: "The Sales Manager's Handbook",
    author: "Joseph C. Ellers",
    genre: "non-fiction",
    price: 25,
    zcoin: 210000,
    cover: "assets/the-sales-managers-handbook.png",
    type: "swap",
  },
]

const newBooks = [
  {
    id: 101,
    title: "Start with Why",
    author: "Simon Sinek",
    genre: "contemporary",
    price: 650,
    cover: "assets/start-with-why.png",
    type: "new",
  },
  {
    id: 102,
    title: "The Power of Positive Thinking",
    author: "Norman Vincent Peale",
    genre: "non-fiction",
    price: 480,
    cover: "assets/the-power-of-positive-thinking.png",
    type: "new",
  },
  {
    id: 103,
    title: "Oromay",
    author: "Bealu Girma",
    genre: "fiction",
    price: 400,
    cover: "assets/oromay.png",
    type: "new",
  },
  {
    id: 104,
    title: "Never Eat Alone",
    author: "Keith Ferrazzi",
    genre: "non-fiction",
    price: 650,
    cover: "assets/never-eat-alone.png",
    type: "new",
  },
  {
    id: 105,
    title: "Atomic Habit",
    author: "James Clear",
    genre: "contemporary",
    price: 700,
    cover: "assets/atomic-habit.png",
    type: "new",
  },
  {
    id: 106,
    title: "ሕማማት",
    author: "ዲያቆን ሄኖክ ኃይሌ",
    genre: "non-fiction",
    price: 520,
    cover: "assets/himamat.png",
    type: "new",
  },
  {
    id: 107,
    title: "Zero to One",
    author: "Peter Thiel",
    genre: "non-fiction",
    price: 430,
    cover: "assets/zero-to-one.png",
    type: "new",
  },
  {
    id: 108,
    title: "Yow Can Win",
    author: "Shiv Khera",
    genre: "non-fiction",
    price: 380,
    cover: "assets/you-can-win.png",
    type: "new",
  },
]

const zcoinValues = {
  category: {
    classics: 30,
    "non-fiction": 25,
    fiction: 20,
    contemporary: 15,
  },
  condition: {
    excellent: 50,
    good: 35,
    fair: 20,
    poor: 10,
  },
}

function calculateZcoin(category, condition) {
  const categoryValue = zcoinValues.category[category] || 15
  const conditionValue = zcoinValues.condition[condition] || 20
  return categoryValue + conditionValue
}

let cart = []
let selectedSwapBook = null

document.addEventListener("DOMContentLoaded", () => {
  renderSwapBooks("all")
  renderNewBooks("all")
  renderBookGrid()
  setupEventListeners()
  animateStats()
  setupScrollAnimations()
  setupTiltEffect()
})

function renderSwapBooks(filter) {
  const container = document.getElementById("swapBooksContainer")
  const filteredBooks = filter === "all" ? swapBooks : swapBooks.filter((book) => book.genre === filter)

  container.innerHTML = filteredBooks
    .map(
      (book) => `
        <div class="book-card" data-book-id="${book.id}">
            <div class="book-cover-img">
                <img src="${book.cover}" alt="${book.title}" />
                <div class="zcoin-badge">${book.zcoin} Ⓩ</div>
            </div>
            <div class="book-info">
                <h3>${book.title}</h3>
                <p class="book-author">${book.author}</p>
                <span class="book-genre">${book.genre}</span>
                <div class="book-footer">
                    <span class="book-price">${book.price} Birr</span>
                    <button class="add-to-cart-btn" onclick="initiateSwap(${book.id})">Swap</button>
                </div>
            </div>
        </div>
    `,
    )
    .join("")
}

function renderNewBooks(filter) {
  const container = document.getElementById("shopBooksContainer")
  const filteredBooks = filter === "all" ? newBooks : newBooks.filter((book) => book.genre === filter)

  container.innerHTML = filteredBooks
    .map(
      (book) => `
        <div class="book-card" data-book-id="${book.id}">
            <div class="book-cover-img">
                <img src="${book.cover}" alt="${book.title}" />
            </div>
            <div class="book-info">
                <h3>${book.title}</h3>
                <p class="book-author">${book.author}</p>
                <span class="book-genre">${book.genre}</span>
                <div class="book-footer">
                    <span class="book-price">${book.price} Birr</span>
                    <button class="add-to-cart-btn" onclick="addToCart(${book.id}, 'new')">Buy</button>
                </div>
            </div>
        </div>
    `,
    )
    .join("")
}

function renderBookGrid() {
  const grid = document.getElementById("bookGrid")
  const featuredBooks = [...swapBooks.slice(0, 3), ...newBooks.slice(0, 3)]

  grid.innerHTML = featuredBooks
    .map(
      (book) => `
        <div class="book-card-mini" title="${book.title}">
            <img src="${book.cover}" alt="${book.title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;" />
        </div>
    `,
    )
    .join("")
}

function initiateSwap(bookId) {
  const book = swapBooks.find((b) => b.id === bookId)
  if (!book) return

  selectedSwapBook = book
  const swapModal = document.getElementById("swapModal")
  const selectedBookDisplay = document.getElementById("selectedSwapBook")

  selectedBookDisplay.innerHTML = `
    <img src="${book.cover}" alt="${book.title}" style="width: 100%; max-width: 150px; border-radius: 10px; margin-bottom: 15px;" />
    <h4>${book.title}</h4>
    <p>${book.author}</p>
    <div class="zcoin-display">${book.zcoin} Ⓩ Required</div>
  `

  swapModal.classList.add("active")
}

function confirmSwap() {
  const userBookTitle = document.getElementById("userBookTitle").value.trim()
  const userBookAuthor = document.getElementById("userBookAuthor").value.trim()
  const userBookCategory = document.getElementById("userBookCategory").value
  const userBookCondition = document.getElementById("userBookCondition").value

  if (!userBookTitle || !userBookAuthor) {
    showNotification("Please enter your book details!")
    return
  }

  if (!selectedSwapBook) return

  const userZcoin = calculateZcoin(userBookCategory, userBookCondition)
  const requiredZcoin = selectedSwapBook.zcoin
  const zcoinDifference = requiredZcoin - userZcoin

  if (zcoinDifference > 0) {
    const additionalBooksNeeded = Math.ceil(zcoinDifference / 30)
    showNotification(
      `Your book has ${userZcoin} Ⓩ but ${requiredZcoin} Ⓩ is required. Please add ${additionalBooksNeeded} more book(s) or choose a different book.`,
      "warning",
    )
    return
  }

  const swapTransaction = {
    ...selectedSwapBook,
    userBook: {
      title: userBookTitle,
      author: userBookAuthor,
      category: userBookCategory,
      condition: userBookCondition,
      zcoin: userZcoin,
    },
    transactionType: "swap",
  }

  if (!cart.find((item) => item.id === selectedSwapBook.id)) {
    cart.push(swapTransaction)
    updateCart()
    showNotification(`Swap approved! Your book (${userZcoin} Ⓩ) matches the requirement.`, "success")

    document.getElementById("swapModal").classList.remove("active")
    document.getElementById("userBookTitle").value = ""
    document.getElementById("userBookAuthor").value = ""
    document.getElementById("userBookCategory").value = "fiction"
    document.getElementById("userBookCondition").value = "good"
    selectedSwapBook = null
  } else {
    showNotification("This book is already in your cart!", "warning")
  }
}

function addToCart(bookId, type) {
  const book = type === "new" ? newBooks.find((b) => b.id === bookId) : swapBooks.find((b) => b.id === bookId)

  if (book && !cart.find((item) => item.id === bookId)) {
    cart.push({ ...book, transactionType: "purchase" })
    updateCart()
    showNotification("Book added to cart!", "success")
  }
}

function removeFromCart(bookId) {
  cart = cart.filter((item) => item.id !== bookId)
  updateCart()
}

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
      (item) => `
        <div class="cart-item">
            <div class="cart-item-cover">
                <img src="${item.cover}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;" />
            </div>
            <div class="cart-item-info">
                <span class="transaction-type ${item.transactionType}">${
                  item.transactionType === "swap" ? "🔄 Swap" : "🛒 Purchase"
                }</span>
                <h3>${item.title}</h3>
                <p class="cart-item-author">${item.author}</p>
                ${
                  item.userBook
                    ? `
                    <div class="swap-details">
                        <p class="cart-item-author" style="color: var(--orange); margin-top: 10px;">
                            Trading: "${item.userBook.title}" by ${item.userBook.author}
                        </p>
                        <div class="zcoin-comparison">
                            <span class="zcoin-badge-small">Your book: ${item.userBook.zcoin} Ⓩ</span>
                            <span class="zcoin-badge-small">Required: ${item.zcoin} Ⓩ</span>
                        </div>
                    </div>
                `
                    : ""
                }
                <p class="cart-item-price">${item.price} Birr</p>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        </div>
    `,
    )
    .join("")

  const total = cart.reduce((sum, item) => sum + item.price, 0)
  cartTotal.textContent = `${total} Birr`
}

function setupEventListeners() {
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

  const swapModal = document.getElementById("swapModal")
  const closeSwap = document.getElementById("closeSwap")
  const confirmSwapBtn = document.getElementById("confirmSwapBtn")

  closeSwap.addEventListener("click", () => {
    swapModal.classList.remove("active")
    selectedSwapBook = null
  })

  swapModal.addEventListener("click", (e) => {
    if (e.target === swapModal) {
      swapModal.classList.remove("active")
      selectedSwapBook = null
    }
  })

  confirmSwapBtn.addEventListener("click", confirmSwap)

  const categorySelect = document.getElementById("userBookCategory")
  const conditionSelect = document.getElementById("userBookCondition")
  const zcoinCalculator = document.getElementById("userZcoinValue")

  function updateZcoinDisplay() {
    const category = categorySelect.value
    const condition = conditionSelect.value
    const zcoin = calculateZcoin(category, condition)
    zcoinCalculator.textContent = `${zcoin} Ⓩ`
  }

  categorySelect.addEventListener("change", updateZcoinDisplay)
  conditionSelect.addEventListener("change", updateZcoinDisplay)

  const filterBtns = document.querySelectorAll(".filter-btn")
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const section = btn.getAttribute("data-section")
      const filter = btn.getAttribute("data-filter")

      const sectionBtns = document.querySelectorAll(`.filter-btn[data-section="${section}"]`)
      sectionBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")

      if (section === "swap") {
        renderSwapBooks(filter)
      } else if (section === "shop") {
        renderNewBooks(filter)
      }
    })
  })

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

function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  const bgColor =
    type === "success"
      ? "rgba(34, 197, 94, 0.9)"
      : type === "warning"
        ? "rgba(251, 146, 60, 0.9)"
        : "rgba(255, 140, 0, 0.9)"

  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        backdrop-filter: blur(20px);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        font-weight: 600;
        z-index: 3000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `
  notification.textContent = message
  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease"
    setTimeout(() => notification.remove(), 300)
  }, 4000)
}

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
