import { Chart } from "@/components/ui/chart"

class BankingApp {
  constructor() {
    this.currentPage = "dashboard"
    this.isBalanceVisible = true
    this.init()
  }

  init() {
    this.bindEvents()
    this.loadPage("dashboard")
    this.updatePageTitle("dashboard")
  }

  bindEvents() {
    document.getElementById("sidebarToggle").addEventListener("click", () => {
      this.toggleSidebar()
    })

    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const page = link.dataset.page
        this.navigateToPage(page)
      })
    })

    document.querySelectorAll(".quick-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const page = btn.dataset.page
        this.navigateToPage(page)
      })
    })

    document.addEventListener("click", (e) => {
      if (e.target.closest(".service-btn")) {
        const page = e.target.closest(".service-btn").dataset.page
        this.navigateToPage(page)
      }
    })

    document.addEventListener("click", (e) => {
      if (e.target.closest(".chart-card")) {
        const page = e.target.closest(".chart-card").dataset.page
        this.navigateToPage(page)
      }
    })

    document.addEventListener("click", (e) => {
      if (e.target.closest(".account-card")) {
        const page = e.target.closest(".account-card").dataset.page
        if (page) {
          this.navigateToPage(page)
        }
      }
    })

    document.addEventListener("click", (e) => {
      if (e.target.closest(".view-all-btn")) {
        const page = e.target.closest(".view-all-btn").dataset.page
        this.navigateToPage(page)
      }
    })

    document.addEventListener("click", (e) => {
      if (e.target.closest("#balanceToggle")) {
        this.toggleBalance()
      }
    })

    const searchInput = document.getElementById("searchInput")
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.handleSearch(e.target.value)
      })
    }

    document.getElementById("notificationBtn").addEventListener("click", () => {
      this.showNotifications()
    })

    document.getElementById("userMenuBtn").addEventListener("click", () => {
      this.showUserMenu()
    })

    document.getElementById("modalClose").addEventListener("click", () => {
      window.hideModal()
    })

    document.getElementById("modalOverlay").addEventListener("click", (e) => {
      if (e.target === e.currentTarget) {
        window.hideModal()
      }
    })

    document.addEventListener("submit", (e) => {
      if (e.target.id === "transferForm") {
        e.preventDefault()
        this.handleTransferForm(e.target)
      }
    })

    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("tab-btn")) {
        this.switchTab(e.target)
      }
    })

    document.addEventListener("click", (e) => {
      if (e.target.closest(".transaction-item")) {
        const transactionId = e.target.closest(".transaction-item").dataset.transactionId
        this.showTransactionDetail(transactionId)
      }
    })

    window.addEventListener("resize", () => {
      this.handleResize()
    })
  }

  navigateToPage(pageName) {
    if (this.currentPage === pageName) return

    document.querySelectorAll(".page").forEach((page) => {
      page.classList.remove("active")
    })

    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active")
    })

    const activeNavLink = document.querySelector(`[data-page="${pageName}"]`)
    if (activeNavLink) {
      activeNavLink.classList.add("active")
    }

    this.loadPage(pageName)
    this.updatePageTitle(pageName)
    this.currentPage = pageName

    if (window.innerWidth <= 768) {
      this.closeSidebar()
    }

    window.showToast("페이지 이동", `${this.getPageTitle(pageName)} 페이지로 이동했습니다.`, "info", 2000)
  }

  loadPage(pageName) {
    const pageContent = document.getElementById("pageContent")
    const pageElement = document.getElementById(pageName)

    const pages = {
      dashboard: () => "<div>Dashboard Content</div>",
      account: () => "<div>Account Content</div>",
      transfer: () => "<div>Transfer Content</div>",
      transactions: () => "<div>Transactions Content</div>",
      spending: () => "<div>Spending Content</div>",
      alerts: () => "<div>Alerts Content</div>",
      settings: () => "<div>Settings Content</div>",
      admin: () => "<div>Admin Content</div>",
    }

    if (pages[pageName]) {
      if (pageElement) {
        pageElement.innerHTML = pages[pageName]()
        pageElement.classList.add("active")
      } else {
        const newPage = document.createElement("div")
        newPage.id = pageName
        newPage.className = "page active"
        newPage.innerHTML = pages[pageName]()
        pageContent.appendChild(newPage)
      }

      this.initializePage(pageName)
    }
  }

  initializePage(pageName) {
    switch (pageName) {
      case "dashboard":
        setTimeout(() => {
          window.createSpendingChart(window.formatCurrency, window.monthlySpendingData)
          window.createTransferChart(window.formatCurrency, window.monthlySpendingData)
        }, 100)
        break

      case "transfer":
        this.initializeTransferForm()
        break

      case "transactions":
        this.initializeTransactionFilters()
        break

      case "spending":
        setTimeout(() => {
          this.initializeSpendingCharts()
        }, 100)
        break

      case "alerts":
        this.initializeAlertSettings()
        break
    }
  }

  initializeTransferForm() {
    const amountInput = document.querySelector(".amount-input")
    if (amountInput) {
      window.formatNumberInput(amountInput)
    }

    const accountInput = document.querySelector('input[name="toAccount"]')
    if (accountInput) {
      window.formatAccountNumber(accountInput)
    }
  }

  initializeTransactionFilters() {
    const accountFilter = document.getElementById("accountFilter")
    const typeFilter = document.getElementById("typeFilter")
    const dateFilter = document.getElementById("dateFilter")
    const searchFilter = document.getElementById("searchFilter")

    if (accountFilter) {
      accountFilter.addEventListener("change", () => this.filterTransactions())
    }
    if (typeFilter) {
      typeFilter.addEventListener("change", () => this.filterTransactions())
    }
    if (dateFilter) {
      dateFilter.addEventListener("change", () => this.filterTransactions())
    }
    if (searchFilter) {
      searchFilter.addEventListener("input", (e) => {
        this.filterTransactions(e.target.value)
      })
    }
  }

  initializeSpendingCharts() {
    const categoryCtx = document.getElementById("categoryChart")
    if (categoryCtx) {
      new Chart(categoryCtx, {
        type: "doughnut",
        data: {
          labels: window.categorySpendingData.map((item) => item.name),
          datasets: [
            {
              data: window.categorySpendingData.map((item) => item.value),
              backgroundColor: window.categorySpendingData.map((item) => item.color),
              borderWidth: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      })
    }

    const trendCtx = document.getElementById("trendChart")
    if (trendCtx) {
      new Chart(trendCtx, {
        type: "line",
        data: {
          labels: window.monthlySpendingData.map((item) => item.month),
          datasets: [
            {
              label: "소비금액",
              data: window.monthlySpendingData.map((item) => item.amount),
              borderColor: "#2A5D9F",
              backgroundColor: "rgba(42, 93, 159, 0.1)",
              borderWidth: 3,
              fill: true,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: (value) => window.formatCurrency(value) + "원",
              },
            },
          },
        },
      })
    }
  }

  initializeAlertSettings() {
    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.switchTab(e.target)
      })
    })

    document.querySelectorAll(".toggle-switch input").forEach((toggle) => {
      toggle.addEventListener("change", (e) => {
        this.handleToggleChange(e.target)
      })
    })
  }

  switchTab(tabBtn) {
    const tabId = tabBtn.dataset.tab

    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.classList.remove("active")
    })
    tabBtn.classList.add("active")

    document.querySelectorAll(".tab-content").forEach((content) => {
      content.classList.remove("active")
      content.style.display = "none"
    })

    const activeTab = document.getElementById(tabId)
    if (activeTab) {
      activeTab.classList.add("active")
      activeTab.style.display = "block"
    }
  }

  handleToggleChange(toggle) {
    const settingName = toggle.closest(".setting-item").querySelector("h4").textContent
    const isEnabled = toggle.checked

    window.showToast("설정 변경", `${settingName}이 ${isEnabled ? "활성화" : "비활성화"}되었습니다.`, "success")
  }

  filterTransactions(query) {
    window.showToast("필터 적용", "거래 내역이 필터링되었습니다.", "info")
  }

  handleTransferForm(form) {
    const formData = new FormData(form)
    const transferData = {
      fromAccount: formData.get("fromAccount"),
      toBank: formData.get("toBank"),
      toAccount: formData.get("toAccount"),
      recipientName: formData.get("recipientName"),
      amount: formData.get("amount"),
      memo: formData.get("memo"),
    }

    const errors = this.validateTransferForm(transferData)
    if (Object.keys(errors).length > 0) {
      window.showFormErrors(errors)
      return
    }

    this.showTransferConfirmation(transferData)
  }

  validateTransferForm(data) {
    const errors = {}

    if (!data.fromAccount) {
      errors.fromAccount = "출금 계좌를 선택해주세요."
    }

    if (!data.toBank) {
      errors.toBank = "입금 은행을 선택해주세요."
    }

    if (!data.toAccount) {
      errors.toAccount = "입금 계좌번호를 입력해주세요."
    }

    if (!data.recipientName) {
      errors.recipientName = "받는 분 성함을 입력해주세요."
    }

    if (!data.amount) {
      errors.amount = "이체 금액을 입력해주세요."
    } else {
      const amount = Number.parseInt(data.amount.replace(/,/g, ""))
      if (amount < 1000) {
        errors.amount = "최소 이체 금액은 1,000원입니다."
      }
      if (amount > 10000000) {
        errors.amount = "1회 이체 한도는 10,000,000원입니다."
      }
    }

    return errors
  }

  showTransferConfirmation(transferData) {
    const amount = Number.parseInt(transferData.amount.replace(/,/g, ""))
    const content = `
            <div class="transfer-confirmation">
                <div class="confirmation-item">
                    <span class="label">출금 계좌</span>
                    <span class="value">${this.getAccountName(transferData.fromAccount)}</span>
                </div>
                <div class="confirmation-item">
                    <span class="label">입금 은행</span>
                    <span class="value">${this.getBankName(transferData.toBank)}</span>
                </div>
                <div class="confirmation-item">
                    <span class="label">입금 계좌</span>
                    <span class="value">${transferData.toAccount}</span>
                </div>
                <div class="confirmation-item">
                    <span class="label">받는 분</span>
                    <span class="value">${transferData.recipientName}</span>
                </div>
                <div class="confirmation-item highlight">
                    <span class="label">이체 금액</span>
                    <span class="value">${window.formatCurrency(amount)}원</span>
                </div>
                ${
                  transferData.memo
                    ? `
                    <div class="confirmation-item">
                        <span class="label">메모</span>
                        <span class="value">${transferData.memo}</span>
                    </div>
                `
                    : ""
                }
                
                <div class="confirmation-actions">
                    <button class="btn btn-secondary" onclick="window.hideModal()">취소</button>
                    <button class="btn btn-primary" onclick="window.app.processTransfer()">이체 실행</button>
                </div>
            </div>
        `

    window.showModal("이체 확인", content)
  }

  processTransfer() {
    window.hideModal()

    window.showToast("이체 처리 중", "이체를 처리하고 있습니다...", "info", 0)

    setTimeout(() => {
        document.querySelectorAll(".toast").forEach((toast) => toast.remove())

      window.showToast("이체 완료", "이체가 성공적으로 완료되었습니다.", "success")

      setTimeout(() => {
        this.navigateToPage("dashboard")
      }, 2000)
    }, 3000)
  }

  showTransactionDetail(transactionId) {
    const transactionsData = [
      {
        id: "1",
        description: "Transaction 1",
        amount: 1000,
        date: "2023-10-01",
        time: "10:00",
        balance: 10000,
        account: "Account 1",
        type: "Income",
        category: "Salary",
        memo: "Monthly Salary",
      },
      {
        id: "2",
        description: "Transaction 2",
        amount: -500,
        date: "2023-10-02",
        time: "12:00",
        balance: 9500,
        account: "Account 1",
        type: "Expense",
        category: "Groceries",
        memo: "Weekly Groceries",
      },
    ]

    const transaction = transactionsData.find((t) => t.id === transactionId)
    if (!transaction) return

    const isIncome = transaction.amount > 0
    const content = `
            <div class="transaction-detail">
                <div class="transaction-header">
                    <div class="transaction-icon ${isIncome ? "income" : "expense"}">
                        <i class="fas fa-${isIncome ? "arrow-down" : "arrow-up"}"></i>
                    </div>
                    <div class="transaction-info">
                        <h3>${transaction.description}</h3>
                        <p class="transaction-amount ${isIncome ? "income" : "expense"}">
                            ${isIncome ? "+" : ""}${window.formatCurrency(transaction.amount)}원
                        </p>
                    </div>
                </div>
                
                <div class="transaction-details">
                    <div class="detail-item">
                        <span class="label">거래일시</span>
                        <span class="value">${transaction.date} ${transaction.time}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">거래 후 잔액</span>
                        <span class="value">${window.formatCurrency(transaction.balance)}원</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">거래 계좌</span>
                        <span class="value">${transaction.account}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">거래 유형</span>
                        <span class="value">${transaction.type}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">카테고리</span>
                        <span class="value">${transaction.category}</span>
                    </div>
                    ${
                      transaction.memo
                        ? `
                        <div class="detail-item">
                            <span class="label">메모</span>
                            <span class="value">${transaction.memo}</span>
                        </div>
                    `
                        : ""
                    }
                </div>
                
                <div class="transaction-actions">
                    <button class="btn btn-secondary" onclick="window.copyToClipboard('${transaction.id}')">
                        <i class="fas fa-copy"></i> 거래번호 복사
                    </button>
                    <button class="btn btn-secondary">
                        <i class="fas fa-download"></i> 영수증 다운로드
                    </button>
                </div>
            </div>
        `

    window.showModal("거래 상세 내역", content)
  }

  showNotifications() {
    const notificationsData = [
      { id: "1", message: "Notification 1", timestamp: "2023-10-01 10:00" },
      { id: "2", message: "Notification 2", timestamp: "2023-10-02 12:00" },
    ]

    const createNotificationItem = (notification) => `
            <div class="notification-item" data-notification-id="${notification.id}">
                <p>${notification.message}</p>
                <span class="timestamp">${notification.timestamp}</span>
            </div>
        `

    const notificationsList = notificationsData.map(createNotificationItem).join("")
    const content = `
            <div class="notifications-list">
                ${notificationsList}
            </div>
            <div class="notifications-actions">
                <button class="btn btn-secondary">모두 읽음 처리</button>
                <button class="btn btn-secondary" onclick="window.app.navigateToPage('alerts')">알림 설정</button>
            </div>
        `

    window.showModal("알림", content)
  }

  showUserMenu() {
    const userData = {
      name: "홍길동",
      email: "hong@example.com",
      userType: "일반",
    }

    const content = `
            <div class="user-menu-content">
                <div class="user-profile-info">
                    <div class="avatar large">홍</div>
                    <div class="user-details">
                        <h3>${userData.name}</h3>
                        <p>${userData.email}</p>
                        <span class="user-type">${userData.userType} 고객</span>
                    </div>
                </div>
                
                <div class="user-menu-items">
                    <button class="menu-item" onclick="window.app.navigateToPage('profile')">
                        <i class="fas fa-user"></i> 내 정보
                    </button>
                    <button class="menu-item" onclick="window.app.navigateToPage('settings')">
                        <i class="fas fa-cog"></i> 설정
                    </button>
                    <button class="menu-item" onclick="window.app.navigateToPage('alerts')">
                        <i class="fas fa-bell"></i> 알림 설정
                    </button>
                    <button class="menu-item">
                        <i class="fas fa-question-circle"></i> 도움말
                    </button>
                    <button class="menu-item logout">
                        <i class="fas fa-sign-out-alt"></i> 로그아웃
                    </button>
                </div>
            </div>
        `

    window.showModal("사용자 메뉴", content)
  }

  toggleSidebar() {
    const sidebar = document.getElementById("sidebar")
    const mainContent = document.querySelector(".main-content")

    sidebar.classList.toggle("collapsed")
    mainContent.classList.toggle("expanded")
  }

  closeSidebar() {
    const sidebar = document.getElementById("sidebar")
    const mainContent = document.querySelector(".main-content")

    sidebar.classList.add("collapsed")
    mainContent.classList.add("expanded")
  }

  toggleBalance() {
    this.isBalanceVisible = !this.isBalanceVisible
    const balanceElements = document.querySelectorAll(".balance-amount")
    const toggleBtn = document.getElementById("balanceToggle")

    balanceElements.forEach((element) => {
      if (this.isBalanceVisible) {
        element.textContent = element.dataset.originalValue || element.textContent
        toggleBtn.innerHTML = '<i class="fas fa-eye"></i>'
      } else {
        element.dataset.originalValue = element.textContent
        element.textContent = "***,***원"
        toggleBtn.innerHTML = '<i class="fas fa-eye-slash"></i>'
      }
    })
  }

  handleSearch(query) {
    if (query.length < 2) return

    window.showToast("검색", `"${query}"에 대한 검색을 수행합니다.`, "info")
  }

  handleResize() {
    if (window.innerWidth <= 768) {
      this.closeSidebar()
    }
  }

  updatePageTitle(pageName) {
    const titles = {
      dashboard: "대시보드",
      account: "계좌 조회",
      transfer: "계좌 이체",
      transactions: "거래 내역",
      spending: "소비 리포트",
      alerts: "알림 설정",
      settings: "설정",
      admin: "관리자 대시보드",
    }

    const pageTitle = document.getElementById("pageTitle")
    const pageSubtitle = document.getElementById("pageSubtitle")

    if (pageTitle) {
      pageTitle.textContent = titles[pageName] || "페이지"
    }

    if (pageSubtitle) {
      const subtitles = {
        dashboard: "오늘도 안전한 금융거래 되세요",
        account: "보유하신 계좌 정보를 확인하세요",
        transfer: "안전하고 빠른 계좌 이체",
        transactions: "거래 내역을 확인하세요",
        spending: "소비 패턴을 분석해보세요",
        alerts: "알림 및 보안 설정을 관리하세요",
        settings: "개인 설정을 관리하세요",
        admin: "시스템 관리 및 통계",
      }
      pageSubtitle.textContent = subtitles[pageName] || ""
    }
  }

  getPageTitle(pageName) {
    const titles = {
      dashboard: "대시보드",
      account: "계좌 조회",
      transfer: "계좌 이체",
      transactions: "거래 내역",
      spending: "소비 리포트",
      alerts: "알림 설정",
      settings: "설정",
      admin: "관리자 대시보드",
    }
    return titles[pageName] || "페이지"
  }

  getAccountName(accountId) {
    const accountsData = [
      { id: "1", name: "Account 1" },
      { id: "2", name: "Account 2" },
    ]

    const account = accountsData.find((acc) => acc.id === accountId)
    return account ? account.name : "알 수 없는 계좌"
  }

  getBankName(bankCode) {
    const banksData = [
      { code: "001", name: "Bank 1" },
      { code: "002", name: "Bank 2" },
    ]

    const bank = banksData.find((b) => b.code === bankCode)
    return bank ? bank.name : "알 수 없는 은행"
  }
}

function navigateToPage(pageName) {
  if (window.app) {
    window.app.navigateToPage(pageName)
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.app = new BankingApp()

  setTimeout(() => {
    window.showToast("환영합니다", "KB 디지털뱅킹에 오신 것을 환영합니다!", "success")
  }, 1000)
})


window.addEventListener("beforeunload", () => {

})


window.debounce = (func, wait) => {
  let timeout
  return function (...args) {
    
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

window.hideModal = () => {
  const modal = document.getElementById("modal")
  const modalOverlay = document.getElementById("modalOverlay")
  if (modal) {
    modal.style.display = "none"
  }
  if (modalOverlay) {
    modalOverlay.style.display = "none"
  }
}

window.showToast = (title, message, type, duration = 3000) => {
  const toast = document.createElement("div")
  toast.className = `toast ${type}`
  toast.innerHTML = `<strong>${title}</strong>: ${message}`
  document.body.appendChild(toast)

  setTimeout(() => {
    document.body.removeChild(toast)
  }, duration)
}

window.showModal = (title, content) => {
  const modal = document.getElementById("modal")
  const modalOverlay = document.getElementById("modalOverlay")
  const modalTitle = document.getElementById("modalTitle")
  const modalContent = document.getElementById("modalContent")

  if (modal) {
    modal.style.display = "block"
  }
  if (modalOverlay) {
    modalOverlay.style.display = "block"
  }
  if (modalTitle) {
    modalTitle.textContent = title
  }
  if (modalContent) {
    modalContent.innerHTML = content
  }
}

window.formatCurrency = (value) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

window.formatNumberInput = (input) => {
  input.addEventListener("input", (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "")
    e.target.value = window.formatCurrency(value)
  })
}

window.formatAccountNumber = (input) => {
  input.addEventListener("input", (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "")
    e.target.value = value
  })
}

window.copyToClipboard = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      window.showToast("복사 완료", "거래번호가 클립보드에 복사되었습니다.", "success")
    })
    .catch((err) => {
      console.error("복사 실패: ", err)
      window.showToast("복사 실패", "거래번호를 클립보드에 복사하지 못했습니다.", "error")
    })
}
