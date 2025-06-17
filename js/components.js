import { Chart } from "@/components/ui/chart"

function createTransactionItem(transaction, formatCurrency) {
  const isIncome = transaction.amount > 0
  const iconClass = isIncome ? "fas fa-arrow-down" : "fas fa-arrow-up"
  const amountClass = isIncome ? "income" : "expense"
  const iconBgClass = isIncome ? "income" : "expense"

  return `
        <div class="transaction-item" data-transaction-id="${transaction.id}">
            <div class="transaction-left">
                <div class="transaction-icon ${iconBgClass}">
                    <i class="${iconClass}"></i>
                </div>
                <div class="transaction-info">
                    <h4>${transaction.description}</h4>
                    <p>${transaction.date} ${transaction.time}</p>
                </div>
            </div>
            <div class="transaction-right">
                <div class="transaction-amount ${amountClass}">
                    ${isIncome ? "+" : ""}${formatCurrency(transaction.amount)}원
                </div>
                <div class="transaction-status badge-sm badge-success">
                    ${transaction.status}
                </div>
            </div>
        </div>
    `
}

function createAccountCard(account, monthlySpendingData, formatCurrency) {
  const IconComponent = account.icon

  return `
        <div class="account-card" data-account-id="${account.id}">
            <div class="account-header" style="background: ${account.color}">
                <div class="account-info">
                    <div class="account-type">
                        <span class="badge">${account.type}</span>
                    </div>
                    <h3>${account.name}</h3>
                    <p>${account.number}</p>
                </div>
                <div class="account-actions">
                    <i class="${account.icon} account-icon"></i>
                </div>
            </div>
            <div class="account-content">
                <div class="balance-section">
                    <p class="balance-label">${account.type === "카드" ? "한도" : "잔액"}</p>
                    <p class="balance-amount">${formatCurrency(account.balance)}원</p>
                </div>
                
                <div class="account-actions-buttons">
                    <button class="btn btn-secondary btn-sm" onclick="navigateToPage('transactions')">
                        거래내역
                    </button>
                    <button class="btn btn-accent btn-sm" onclick="navigateToPage('transfer')">
                        ${account.type === "카드" ? "사용내역" : "이체"}
                    </button>
                </div>
                
                ${
                  account.type === "적금"
                    ? `
                    <div class="account-details">
                        <div class="detail-item">
                            <span>만기일</span>
                            <span>${account.maturityDate}</span>
                        </div>
                        <div class="detail-item">
                            <span>금리</span>
                            <span class="text-accent">${account.interestRate}%</span>
                        </div>
                    </div>
                `
                    : ""
                }
                
                ${
                  account.type === "예금"
                    ? `
                    <div class="account-details">
                        <div class="detail-item">
                            <span>만기일</span>
                            <span>${account.maturityDate}</span>
                        </div>
                        <div class="detail-item">
                            <span>금리</span>
                            <span class="text-accent">${account.interestRate}%</span>
                        </div>
                    </div>
                `
                    : ""
                }
                
                ${
                  account.type === "카드"
                    ? `
                    <div class="account-details">
                        <div class="detail-item">
                            <span>이번 달 사용</span>
                            <span>${formatCurrency(account.monthlyUsage)}원</span>
                        </div>
                        <div class="detail-item">
                            <span>결제일</span>
                            <span>${account.paymentDate}</span>
                        </div>
                    </div>
                `
                    : ""
                }
            </div>
        </div>
    `
}

function createNotificationItem(notification) {
  return `
        <div class="notification-item ${notification.unread ? "unread" : ""}" data-notification-id="${notification.id}">
            <div class="notification-icon">
                <i class="${notification.icon}"></i>
            </div>
            <div class="notification-content">
                <h4>${notification.title}</h4>
                <p>${notification.message}</p>
                <span class="notification-time">${notification.time}</span>
            </div>
            ${notification.unread ? '<div class="unread-indicator"></div>' : ""}
        </div>
    `
}

function createSpendingChart(formatCurrency, monthlySpendingData) {
  const ctx = document.getElementById("spendingChart")
  if (!ctx) return

  new Chart(ctx, {
    type: "line",
    data: {
      labels: monthlySpendingData.map((item) => item.month),
      datasets: [
        {
          label: "소비금액",
          data: monthlySpendingData.map((item) => item.amount),
          borderColor: "#00C49F",
          backgroundColor: "rgba(0, 196, 159, 0.1)",
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#00C49F",
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2,
          pointRadius: 6,
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
          grid: {
            color: "#f0f0f0",
          },
          ticks: {
            color: "#6B7280",
            callback: (value) => formatCurrency(value) + "원",
          },
        },
        x: {
          grid: {
            color: "#f0f0f0",
          },
          ticks: {
            color: "#6B7280",
          },
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
    },
  })
}

function createTransferChart(formatCurrency, monthlySpendingData) {
  const ctx = document.getElementById("transferChart")
  if (!ctx) return

  const transferData = monthlySpendingData.slice(0, 4)

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: transferData.map((item) => item.month),
      datasets: [
        {
          label: "이체금액",
          data: transferData.map((item) => item.amount),
          backgroundColor: "#2A5D9F",
          borderColor: "#2A5D9F",
          borderWidth: 1,
          borderRadius: 4,
          borderSkipped: false,
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
          grid: {
            color: "#f0f0f0",
          },
          ticks: {
            color: "#6B7280",
            callback: (value) => formatCurrency(value) + "원",
          },
        },
        x: {
          grid: {
            color: "#f0f0f0",
          },
          ticks: {
            color: "#6B7280",
          },
        },
      },
    },
  })
}

function createFormGroup(label, input, error = "") {
  return `
        <div class="form-group">
            <label class="form-label">${label}</label>
            ${input}
            ${error ? `<div class="form-error">${error}</div>` : ""}
        </div>
    `
}

function createInput(name, type = "text", placeholder = "", value = "", className = "") {
  return `<input type="${type}" name="${name}" placeholder="${placeholder}" value="${value}" class="form-input ${className}">`
}

function createSelect(name, options, value = "", className = "") {
  const optionsHtml = options
    .map(
      (option) => `<option value="${option.value}" ${option.value === value ? "selected" : ""}>${option.text}</option>`,
    )
    .join("")

  return `<select name="${name}" class="form-select ${className}">${optionsHtml}</select>`
}

function createTextarea(name, placeholder = "", value = "", rows = 3, className = "") {
  return `<textarea name="${name}" placeholder="${placeholder}" rows="${rows}" class="form-input ${className}">${value}</textarea>`
}

function createTable(headers, rows, className = "") {
  const headerHtml = headers.map((header) => `<th>${header}</th>`).join("")
  const rowsHtml = rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")

  return `
        <table class="table ${className}">
            <thead>
                <tr>${headerHtml}</tr>
            </thead>
            <tbody>
                ${rowsHtml}
            </tbody>
        </table>
    `
}

function createPagination(currentPage, totalPages, onPageChange) {
  let paginationHtml = '<div class="pagination">'

  if (currentPage > 1) {
    paginationHtml += `<button class="pagination-btn" onclick="${onPageChange}(${currentPage - 1})">이전</button>`
  }


  for (let i = 1; i <= totalPages; i++) {
    if (i === currentPage) {
      paginationHtml += `<button class="pagination-btn active">${i}</button>`
    } else {
      paginationHtml += `<button class="pagination-btn" onclick="${onPageChange}(${i})">${i}</button>`
    }
  }

  if (currentPage < totalPages) {
    paginationHtml += `<button class="pagination-btn" onclick="${onPageChange}(${currentPage + 1})">다음</button>`
  }

  paginationHtml += "</div>"
  return paginationHtml
}

function showPageLoading() {
  return `
        <div class="loading-container">
            <div class="loading-spinner"></div>
            <p>로딩 중...</p>
        </div>
    `
}

function showEmptyState(message, icon = "fas fa-inbox") {
  return `
        <div class="empty-state">
            <i class="${icon}"></i>
            <p>${message}</p>
        </div>
    `
}

function showErrorState(message, onRetry = null) {
  return `
        <div class="error-state">
            <i class="fas fa-exclamation-triangle"></i>
            <p>${message}</p>
            ${onRetry ? `<button class="btn btn-primary" onclick="${onRetry}">다시 시도</button>` : ""}
        </div>
    `
}

window.createTransactionItem = createTransactionItem
window.createAccountCard = createAccountCard
window.createNotificationItem = createNotificationItem
window.createSpendingChart = createSpendingChart
window.createTransferChart = createTransferChart
window.createFormGroup = createFormGroup
window.createInput = createInput
window.createSelect = createSelect
window.createTextarea = createTextarea
window.createTable = createTable
window.createPagination = createPagination
window.showPageLoading = showPageLoading
window.showEmptyState = showEmptyState
window.showErrorState = showErrorState
