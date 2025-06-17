
function formatCurrency(amount) {
  return new Intl.NumberFormat("ko-KR").format(Math.abs(amount))
}

function formatDate(date) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date))
}

function formatTime(date) {
  return new Intl.DateTimeFormat("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date))
}

function showToast(title, message, type = "info", duration = 5000) {
  const toastContainer = document.getElementById("toastContainer")
  const toastId = "toast-" + Date.now()

  const icons = {
    success: "fas fa-check-circle",
    error: "fas fa-exclamation-circle",
    warning: "fas fa-exclamation-triangle",
    info: "fas fa-info-circle",
  }

  const toast = document.createElement("div")
  toast.id = toastId
  toast.className = `toast ${type}`
  toast.innerHTML = `
        <div class="toast-icon">
            <i class="${icons[type]}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="removeToast('${toastId}')">
            <i class="fas fa-times"></i>
        </button>
    `

  toastContainer.appendChild(toast)

  if (duration > 0) {
    setTimeout(() => {
      removeToast(toastId)
    }, duration)
  }
}

function removeToast(toastId) {
  const toast = document.getElementById(toastId)
  if (toast) {
    toast.classList.add("removing")
    setTimeout(() => {
      toast.remove()
    }, 300)
  }
}

function showModal(title, content) {
  const modal = document.getElementById("modal")
  const modalOverlay = document.getElementById("modalOverlay")
  const modalTitle = document.getElementById("modalTitle")
  const modalContent = document.getElementById("modalContent")

  modalTitle.textContent = title
  modalContent.innerHTML = content
  modalOverlay.style.display = "flex"

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hideModal()
    }
  })
}

function hideModal() {
  const modalOverlay = document.getElementById("modalOverlay")
  modalOverlay.style.display = "none"
}

function showLoading(element) {
  const originalContent = element.innerHTML
  element.innerHTML = '<div class="loading-spinner"></div>'
  element.disabled = true

  return function hideLoading() {
    element.innerHTML = originalContent
    element.disabled = false
  }
}

function animateElement(element, animationClass) {
  element.classList.add(animationClass)
  element.addEventListener(
    "animationend",
    () => {
      element.classList.remove(animationClass)
    },
    { once: true },
  )
}

function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.error("로컬 스토리지 저장 실패:", e)
    }
  },

  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (e) {
      console.error("로컬 스토리지 읽기 실패:", e)
      return defaultValue
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key)
    } catch (e) {
      console.error("로컬 스토리지 삭제 실패:", e)
    }
  },
}


async function apiCall(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("API 호출 실패:", error)
    throw error
  }
}

function validateForm(formData, rules) {
  const errors = {}

  for (const [field, rule] of Object.entries(rules)) {
    const value = formData[field]

    if (rule.required && (!value || value.trim() === "")) {
      errors[field] = rule.message || `${field}는 필수 항목입니다.`
      continue
    }

    if (value && rule.pattern && !rule.pattern.test(value)) {
      errors[field] = rule.message || `${field} 형식이 올바르지 않습니다.`
    }

    if (value && rule.minLength && value.length < rule.minLength) {
      errors[field] = rule.message || `${field}는 최소 ${rule.minLength}자 이상이어야 합니다.`
    }

    if (value && rule.maxLength && value.length > rule.maxLength) {
      errors[field] = rule.message || `${field}는 최대 ${rule.maxLength}자까지 입력 가능합니다.`
    }
  }

  return errors
}

function showFormErrors(errors) {
  document.querySelectorAll(".form-error").forEach((el) => el.remove())
  document.querySelectorAll(".form-input.error").forEach((el) => el.classList.remove("error"))

  for (const [field, message] of Object.entries(errors)) {
    const input = document.querySelector(`[name="${field}"]`)
    if (input) {
      input.classList.add("error")

      const errorDiv = document.createElement("div")
      errorDiv.className = "form-error"
      errorDiv.textContent = message

      input.parentNode.appendChild(errorDiv)
    }
  }
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    showToast("복사 완료", "클립보드에 복사되었습니다.", "success")
  } catch (err) {
    console.error("클립보드 복사 실패:", err)
    showToast("복사 실패", "클립보드 복사에 실패했습니다.", "error")
  }
}

function downloadFile(data, filename, type = "text/plain") {
  const blob = new Blob([data], { type })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  window.URL.revokeObjectURL(url)
}

function formatNumberInput(input) {
  input.addEventListener("input", (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "")
    if (value) {
      value = Number.parseInt(value).toLocaleString("ko-KR")
    }
    e.target.value = value
  })
}

function formatAccountNumber(input) {
  input.addEventListener("input", (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "")
    if (value.length > 3) {
      value = value.substring(0, 3) + "-" + value.substring(3)
    }
    if (value.length > 7) {
      value = value.substring(0, 7) + "-" + value.substring(7)
    }
    if (value.length > 14) {
      value = value.substring(0, 14)
    }
    e.target.value = value
  })
}

function formatPhoneNumber(input) {
  input.addEventListener("input", (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "")
    if (value.length > 3 && value.length <= 7) {
      value = value.substring(0, 3) + "-" + value.substring(3)
    } else if (value.length > 7) {
      value = value.substring(0, 3) + "-" + value.substring(3, 7) + "-" + value.substring(7, 11)
    }
    e.target.value = value
  })
}

window.formatCurrency = formatCurrency
window.formatDate = formatDate
window.formatTime = formatTime
window.showToast = showToast
window.removeToast = removeToast
window.showModal = showModal
window.hideModal = hideModal
window.showLoading = showLoading
window.animateElement = animateElement
window.debounce = debounce
window.storage = storage
window.apiCall = apiCall
window.validateForm = validateForm
window.showFormErrors = showFormErrors
window.copyToClipboard = copyToClipboard
window.downloadFile = downloadFile
window.formatNumberInput = formatNumberInput
window.formatAccountNumber = formatAccountNumber
window.formatPhoneNumber = formatPhoneNumber