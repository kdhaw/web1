const pages = {
  dashboard: (transactionsData, userData, createTransactionItem, createSpendingChart, createTransferChart) => {
    const recentTransactions = transactionsData.slice(0, 4)
    const transactionsList = recentTransactions.map(createTransactionItem).join("")

    setTimeout(() => {
      createSpendingChart()
      createTransferChart()
    }, 100)

    return `
            <div class="welcome-section">
                <h2>안녕하세요, ${userData.name}님</h2>
                <p>오늘도 안전한 금융거래 되세요.</p>
            </div>

            <div class="dashboard-grid">
                <div class="account-card main-account" data-page="account">
                    <div class="account-header">
                        <div class="account-info">
                            <h3>KB Star 통장</h3>
                            <p>123-456-789012</p>
                        </div>
                        <div class="account-actions">
                            <button class="balance-toggle" id="balanceToggle">
                                <i class="fas fa-eye"></i>
                            </button>
                            <i class="fas fa-credit-card account-icon"></i>
                        </div>
                    </div>
                    <div class="account-content">
                        <div class="balance-section">
                            <p class="balance-label">현재 잔액</p>
                            <p class="balance-amount" id="mainBalance">5,420,000원</p>
                        </div>
                        <div class="account-stats">
                            <div class="stat">
                                <p class="stat-label">이번 달 입금</p>
                                <p class="stat-value income">+3,512,500원</p>
                            </div>
                            <div class="stat">
                                <p class="stat-label">이번 달 출금</p>
                                <p class="stat-value expense">-1,289,000원</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="quick-services">
                    <h3>빠른 서비스</h3>
                    <div class="service-buttons">
                        <button class="service-btn primary" data-page="transfer">
                            <i class="fas fa-paper-plane"></i>
                            송금하기
                        </button>
                        <button class="service-btn secondary" data-page="transactions">
                            <i class="fas fa-receipt"></i>
                            거래내역
                        </button>
                        <button class="service-btn accent" data-page="spending">
                            <i class="fas fa-chart-line"></i>
                            소비분석
                        </button>
                        <button class="service-btn purple" data-page="account">
                            <i class="fas fa-wallet"></i>
                            내 계좌
                        </button>
                        <button class="service-btn orange" data-page="admin">
                            <i class="fas fa-user-shield"></i>
                            관리자
                        </button>
                    </div>
                </div>
            </div>

            <div class="charts-section">
                <div class="chart-card" data-page="spending">
                    <div class="chart-header">
                        <h3>월별 소비 추이</h3>
                        <p>최근 6개월 소비 패턴</p>
                    </div>
                    <div class="chart-container">
                        <canvas id="spendingChart" width="400" height="200"></canvas>
                    </div>
                </div>

                <div class="chart-card" data-page="transactions">
                    <div class="chart-header">
                        <h3>최근 이체 현황</h3>
                        <p>일별 이체 금액</p>
                    </div>
                    <div class="chart-container">
                        <canvas id="transferChart" width="400" height="200"></canvas>
                    </div>
                </div>
            </div>

            <div class="recent-transactions">
                <div class="section-header">
                    <div>
                        <h3>최근 거래 내역</h3>
                        <p>최근 4건의 거래 내역입니다</p>
                    </div>
                    <button class="view-all-btn" data-page="transactions">전체 보기</button>
                </div>
                <div class="transactions-list">
                    ${transactionsList}
                </div>
            </div>
        `
  },

  account: (accountsData, formatCurrency, createAccountCard) => {
    const accountsList = accountsData.map(createAccountCard).join("")
    const totalBalance = accountsData.reduce((sum, account) => sum + account.balance, 0)

    return `
            <div class="page-header">
                <button class="btn btn-secondary" onclick="navigateToPage('dashboard')">
                    <i class="fas fa-arrow-left"></i> 뒤로가기
                </button>
                <div class="header-actions">
                    <button class="balance-toggle-all" id="balanceToggleAll">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-accent">
                        <i class="fas fa-plus"></i> 계좌 개설
                    </button>
                </div>
            </div>

            <div class="card mb-4">
                <div class="card-content">
                    <div class="asset-summary">
                        <div>
                            <p class="asset-label">총 보유 자산</p>
                            <p class="asset-amount">${formatCurrency(totalBalance)}원</p>
                        </div>
                        <div class="text-right">
                            <p class="asset-label">보유 계좌</p>
                            <p class="asset-count">${accountsData.length}개</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="accounts-grid">
                ${accountsList}
            </div>

            <div class="card mt-4" style="background: linear-gradient(135deg, rgba(0, 196, 159, 0.1) 0%, rgba(77, 166, 255, 0.1) 100%);">
                <div class="card-content text-center">
                    <i class="fas fa-plus" style="font-size: 3rem; color: var(--bank-accent); margin-bottom: 1rem;"></i>
                    <h3>새로운 계좌가 필요하신가요?</h3>
                    <p class="mb-4">다양한 금융 상품으로 더 나은 금융 생활을 시작하세요</p>
                    <button class="btn btn-accent">계좌 개설 상담 신청</button>
                </div>
            </div>
        `
  },

  transfer: (banksData, accountsData, formatCurrency, createFormGroup, createSelect, createInput, createTextarea) => {
    const bankOptions = banksData.map((bank) => ({
      value: bank.code,
      text: bank.name,
    }))

    const accountOptions = accountsData.map((account) => ({
      value: account.id,
      text: `${account.name} (${formatCurrency(account.balance)}원)`,
    }))

    return `
            <div class="page-header">
                <button class="btn btn-secondary" onclick="navigateToPage('dashboard')">
                    <i class="fas fa-arrow-left"></i> 뒤로가기
                </button>
            </div>

            <div class="transfer-container">
                <div class="transfer-form-section">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">
                                <i class="fas fa-paper-plane"></i> 이체 정보 입력
                            </h3>
                            <p class="card-subtitle">정확한 정보를 입력해주세요</p>
                        </div>
                        <div class="card-content">
                            <form id="transferForm">
                                ${createFormGroup(
                                  "출금 계좌",
                                  createSelect("fromAccount", [
                                    { value: "", text: "출금할 계좌를 선택하세요" },
                                    ...accountOptions,
                                  ]),
                                )}
                                
                                ${createFormGroup(
                                  "입금 은행",
                                  createSelect("toBank", [{ value: "", text: "은행을 선택하세요" }, ...bankOptions]),
                                )}
                                
                                ${createFormGroup(
                                  "입금 계좌번호",
                                  createInput("toAccount", "text", "계좌번호를 입력하세요"),
                                )}
                                
                                ${createFormGroup(
                                  "받는 분 성함",
                                  createInput("recipientName", "text", "받는 분의 성함을 입력하세요"),
                                )}
                                
                                ${createFormGroup(
                                  "이체 금액",
                                  createInput("amount", "text", "이체할 금액을 입력하세요", "", "amount-input"),
                                )}
                                
                                ${createFormGroup("메모 (선택사항)", createTextarea("memo", "메모를 입력하세요"))}
                                
                                <button type="submit" class="btn btn-primary w-full">
                                    다음 단계
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="account-info-section">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">
                                <i class="fas fa-wallet"></i> 내 계좌 정보
                            </h3>
                        </div>
                        <div class="card-content">
                            <div class="my-accounts">
                                ${accountsData
                                  .map(
                                    (account) => `
                                    <div class="account-item" data-account-id="${account.id}">
                                        <p class="account-name">${account.name}</p>
                                        <p class="account-number">${account.number}</p>
                                        <p class="account-balance">${formatCurrency(account.balance)}원</p>
                                    </div>
                                `,
                                  )
                                  .join("")}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
  },

  transactions: (transactionsData, createTransactionItem) => {
    const transactionsList = transactionsData.map(createTransactionItem).join("")

    return `
            <div class="page-header">
                <button class="btn btn-secondary" onclick="navigateToPage('dashboard')">
                    <i class="fas fa-arrow-left"></i> 뒤로가기
                </button>
                <button class="btn btn-secondary">
                    <i class="fas fa-download"></i> 내역 다운로드
                </button>
            </div>

            <div class="card mb-4">
                <div class="card-header">
                    <h3 class="card-title">일별 거래 현황</h3>
                    <p class="card-subtitle">최근 7일간 입출금 현황</p>
                </div>
                <div class="card-content">
                    <div class="chart-container" style="height: 300px;">
                        <canvas id="dailyTransactionChart"></canvas>
                    </div>
                </div>
            </div>

            <div class="card mb-4">
                <div class="card-content">
                    <div class="filters-grid">
                        <div class="filter-group">
                            <label class="form-label">계좌</label>
                            <select class="form-select" id="accountFilter">
                                <option value="all">전체 계좌</option>
                                <option value="kb-star">KB Star 통장</option>
                                <option value="kb-saving">KB 적금통장</option>
                            </select>
                        </div>
                        
                        <div class="filter-group">
                            <label class="form-label">거래 유형</label>
                            <select class="form-select" id="typeFilter">
                                <option value="all">전체</option>
                                <option value="입금">입금</option>
                                <option value="출금">출금</option>
                                <option value="이체">이체</option>
                            </select>
                        </div>
                        
                        <div class="filter-group">
                            <label class="form-label">기간</label>
                            <input type="date" class="form-input" id="dateFilter">
                        </div>
                        
                        <div class="filter-group">
                            <label class="form-label">검색</label>
                            <div class="search-input">
                                <i class="fas fa-search"></i>
                                <input type="text" class="form-input" placeholder="거래 내용 검색" id="searchFilter">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <div class="flex justify-between">
                        <div>
                            <h3 class="card-title">거래 내역</h3>
                            <p class="card-subtitle">총 ${transactionsData.length}건의 거래 내역</p>
                        </div>
                        <button class="btn btn-secondary btn-sm">
                            <i class="fas fa-filter"></i> 상세 필터
                        </button>
                    </div>
                </div>
                <div class="card-content">
                    <div class="transactions-list">
                        ${transactionsList}
                    </div>
                    
                    <div class="text-center mt-4">
                        <button class="btn btn-secondary">더 많은 내역 보기</button>
                    </div>
                </div>
            </div>
        `
  },

  spending: (transactionsData, categorySpendingData, formatCurrency, getCategoryColor, getCategoryIcon) => `
            <div class="page-header">
                <button class="btn btn-secondary" onclick="navigateToPage('dashboard')">
                    <i class="fas fa-arrow-left"></i> 뒤로가기
                </button>
                <button class="btn btn-secondary">
                    <i class="fas fa-download"></i> 리포트 다운로드
                </button>
            </div>

            <div class="period-selector mb-4">
                <div class="period-tabs">
                    <button class="period-tab active" data-period="week">주간</button>
                    <button class="period-tab" data-period="month">월간</button>
                    <button class="period-tab" data-period="quarter">분기</button>
                    <button class="period-tab" data-period="year">연간</button>
                </div>
                <select class="form-select" style="width: 180px;">
                    <option value="1">1월</option>
                    <option value="2">2월</option>
                    <option value="3">3월</option>
                </select>
            </div>

            <div class="summary-cards mb-4">
                <div class="summary-card">
                    <div class="summary-icon">
                        <i class="fas fa-wallet"></i>
                    </div>
                    <div class="summary-content">
                        <h3>총 소비</h3>
                        <p class="summary-amount">2,518,000원</p>
                        <span class="summary-change positive">
                            <i class="fas fa-arrow-up"></i> 전월 대비 8.5% 증가
                        </span>
                    </div>
                </div>

                <div class="summary-card">
                    <div class="summary-icon">
                        <i class="fas fa-chart-pie"></i>
                    </div>
                    <div class="summary-content">
                        <h3>최다 소비 카테고리</h3>
                        <p class="summary-category">주거</p>
                        <span class="summary-amount">650,000원 (25.8%)</span>
                    </div>
                </div>

                <div class="summary-card">
                    <div class="summary-icon">
                        <i class="fas fa-calendar-day"></i>
                    </div>
                    <div class="summary-content">
                        <h3>일평균 소비</h3>
                        <p class="summary-amount">83,933원</p>
                        <span class="summary-change negative">
                            <i class="fas fa-arrow-down"></i> 전월 대비 3.2% 감소
                        </span>
                    </div>
                </div>
            </div>

            <div class="charts-grid mb-4">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">카테고리별 소비</h3>
                        <p class="card-subtitle">1월 소비 비율</p>
                    </div>
                    <div class="card-content">
                        <div class="chart-container" style="height: 300px;">
                            <canvas id="categoryChart"></canvas>
                        </div>
                        <div class="chart-legend">
                            ${categorySpendingData
                              .map(
                                (category) => `
                                <div class="legend-item">
                                    <div class="legend-color" style="background-color: ${category.color}"></div>
                                    <span>${category.name}</span>
                                </div>
                            `,
                              )
                              .join("")}
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">소비 추이</h3>
                        <p class="card-subtitle">최근 6개월 소비 변화</p>
                    </div>
                    <div class="card-content">
                        <div class="chart-container" style="height: 300px;">
                            <canvas id="trendChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">상위 소비 내역</h3>
                    <p class="card-subtitle">금액이 큰 순서대로 정렬</p>
                </div>
                <div class="card-content">
                    <div class="top-transactions">
                        ${transactionsData
                          .filter((t) => t.amount < 0)
                          .slice(0, 5)
                          .map(
                            (transaction) => `
                            <div class="top-transaction-item">
                                <div class="transaction-category">
                                    <div class="category-icon" style="background-color: ${getCategoryColor(transaction.category)}">
                                        <i class="${getCategoryIcon(transaction.category)}"></i>
                                    </div>
                                    <div class="transaction-details">
                                        <h4>${transaction.description}</h4>
                                        <p>${transaction.date} • ${transaction.category}</p>
                                    </div>
                                </div>
                                <div class="transaction-amount">
                                    <span class="amount">-${formatCurrency(transaction.amount)}원</span>
                                </div>
                            </div>
                        `,
                          )
                          .join("")}
                    </div>
                </div>
            </div>

            <div class="card mt-4" style="background: linear-gradient(135deg, rgba(42, 93, 159, 0.1) 0%, rgba(77, 166, 255, 0.1) 100%);">
                <div class="card-content">
                    <div class="analysis-section">
                        <div>
                            <h3>소비 분석 결과</h3>
                            <p>이번 달은 주거 비용과 쇼핑 비용이 전체 소비의 약 42%를 차지했습니다.<br>
                            식비는 전월 대비 12% 증가했으며, 교통비는 15% 감소했습니다.</p>
                        </div>
                        <button class="btn btn-primary">맞춤형 절약 팁 보기</button>
                    </div>
                </div>
            </div>
        `,

  alerts: () => `
            <div class="page-header">
                <button class="btn btn-secondary" onclick="navigateToPage('dashboard')">
                    <i class="fas fa-arrow-left"></i> 뒤로가기
                </button>
            </div>

            <div class="settings-tabs">
                <button class="tab-btn active" data-tab="notifications">알림 설정</button>
                <button class="tab-btn" data-tab="security">보안 설정</button>
                <button class="tab-btn" data-tab="preferences">수신 환경설정</button>
            </div>

            <div class="tab-content active" id="notifications">
                <div class="card mb-4">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-bell"></i> 알림 유형 설정
                        </h3>
                        <p class="card-subtitle">받고 싶은 알림 유형을 선택하세요</p>
                    </div>
                    <div class="card-content">
                        <div class="settings-list">
                            <div class="setting-item">
                                <div class="setting-info">
                                    <h4>로그인 알림</h4>
                                    <p>새로운 기기에서 로그인 시 알림을 받습니다</p>
                                </div>
                                <label class="toggle-switch">
                                    <input type="checkbox" checked>
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>

                            <div class="setting-item">
                                <div class="setting-info">
                                    <h4>거래 알림</h4>
                                    <p>계좌 거래 발생 시 알림을 받습니다</p>
                                </div>
                                <label class="toggle-switch">
                                    <input type="checkbox" checked>
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>

                            <div class="setting-item">
                                <div class="setting-info">
                                    <h4>잔액 알림</h4>
                                    <p>계좌 잔액이 특정 금액 이하일 때 알림을 받습니다</p>
                                </div>
                                <label class="toggle-switch">
                                    <input type="checkbox" checked>
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>

                            <div class="setting-item">
                                <div class="setting-info">
                                    <h4>마케팅 알림</h4>
                                    <p>새로운 상품 및 프로모션 정보를 받습니다</p>
                                </div>
                                <label class="toggle-switch">
                                    <input type="checkbox">
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-mobile-alt"></i> 알림 수신 방법
                        </h3>
                        <p class="card-subtitle">알림을 받을 방법을 선택하세요</p>
                    </div>
                    <div class="card-content">
                        <div class="settings-list">
                            <div class="setting-item">
                                <div class="setting-info">
                                    <h4><i class="fas fa-envelope"></i> 이메일 알림</h4>
                                    <p>user@example.com</p>
                                </div>
                                <label class="toggle-switch">
                                    <input type="checkbox" checked>
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>

                            <div class="setting-item">
                                <div class="setting-info">
                                    <h4><i class="fas fa-mobile-alt"></i> 푸시 알림</h4>
                                    <p>모바일 앱으로 푸시 알림을 받습니다</p>
                                </div>
                                <label class="toggle-switch">
                                    <input type="checkbox" checked>
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>

                            <div class="setting-item">
                                <div class="setting-info">
                                    <h4><i class="fas fa-sms"></i> SMS 알림</h4>
                                    <p>010-****-1234</p>
                                </div>
                                <label class="toggle-switch">
                                    <input type="checkbox">
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tab-content" id="security" style="display: none;">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-shield-alt"></i> 보안 설정
                        </h3>
                        <p class="card-subtitle">계정 보안을 강화하기 위한 설정을 관리하세요</p>
                    </div>
                    <div class="card-content">
                        <div class="security-options">
                            <div class="security-item">
                                <div class="security-info">
                                    <h4>2단계 인증 (OTP)</h4>
                                    <p>Google Authenticator를 통한 추가 보안 인증</p>
                                </div>
                                <div class="security-status">
                                    <span class="status-badge active">활성화됨</span>
                                    <button class="btn btn-secondary btn-sm">관리</button>
                                </div>
                            </div>

                            <div class="security-item">
                                <div class="security-info">
                                    <h4>비밀번호 변경</h4>
                                    <p>마지막 변경: 2024년 1월 10일</p>
                                </div>
                                <button class="btn btn-secondary btn-sm">변경하기</button>
                            </div>

                            <div class="security-item">
                                <div class="security-info">
                                    <h4>활성 세션 관리</h4>
                                    <p>현재 로그인된 모든 기기를 확인하고 관리합니다</p>
                                </div>
                                <button class="btn btn-secondary btn-sm">세션 보기</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tab-content" id="preferences" style="display: none;">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-lock"></i> 수신 환경설정
                        </h3>
                        <p class="card-subtitle">개인정보 처리 및 마케팅 수신 동의를 관리하세요</p>
                    </div>
                    <div class="card-content">
                        <div class="privacy-settings">
                            <div class="privacy-item">
                                <div class="privacy-header">
                                    <h4>개인정보 수집 및 이용 동의</h4>
                                    <span class="required-badge">필수</span>
                                </div>
                                <p>서비스 제공을 위한 필수 개인정보 수집 및 이용에 대한 동의입니다.</p>
                                <button class="btn btn-secondary btn-sm">약관 전문 보기</button>
                            </div>

                            <div class="privacy-item">
                                <div class="privacy-header">
                                    <h4>마케팅 정보 수신 동의</h4>
                                    <label class="toggle-switch">
                                        <input type="checkbox">
                                        <span class="toggle-slider"></span>
                                    </label>
                                </div>
                                <p>새로운 금융상품, 이벤트, 프로모션 정보를 받아보실 수 있습니다.</p>
                                <button class="btn btn-secondary btn-sm">약관 전문 보기</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-actions">
                <button class="btn btn-secondary">취소</button>
                <button class="btn btn-primary">설정 저장</button>
            </div>
        `,

  settings: () => `
            <div class="page-header">
                <button class="btn btn-secondary" onclick="navigateToPage('dashboard')">
                    <i class="fas fa-arrow-left"></i> 뒤로가기
                </button>
            </div>

            <div class="settings-tabs">
                <button class="tab-btn active" data-tab="general">일반</button>
                <button class="tab-btn" data-tab="appearance">화면</button>
                <button class="tab-btn" data-tab="security">보안</button>
                <button class="tab-btn" data-tab="notifications">알림</button>
                <button class="tab-btn" data-tab="privacy">개인정보</button>
            </div>

            <div class="tab-content active" id="general">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-globe"></i> 언어 및 지역
                        </h3>
                        <p class="card-subtitle">언어, 통화, 시간대 설정을 관리하세요</p>
                    </div>
                    <div class="card-content">
                        <div class="settings-grid">
                            <div class="setting-group">
                                <label class="form-label">언어</label>
                                <select class="form-select">
                                    <option value="ko" selected>한국어</option>
                                    <option value="en">English</option>
                                    <option value="ja">日本語</option>
                                    <option value="zh">中文</option>
                                </select>
                            </div>

                            <div class="setting-group">
                                <label class="form-label">통화</label>
                                <select class="form-select">
                                    <option value="KRW" selected>원 (KRW)</option>
                                    <option value="USD">달러 (USD)</option>
                                    <option value="EUR">유로 (EUR)</option>
                                    <option value="JPY">엔 (JPY)</option>
                                </select>
                            </div>

                            <div class="setting-group">
                                <label class="form-label">자동 로그아웃</label>
                                <select class="form-select">
                                    <option value="15">15분</option>
                                    <option value="30" selected>30분</option>
                                    <option value="60">1시간</option>
                                    <option value="never">사용 안함</option>
                                </select>
                                <p class="setting-help">설정한 시간 동안 활동이 없으면 자동으로 로그아웃됩니다</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 다른 탭 내용들... -->
        `,

  admin: (adminStatsData, formatCurrency) => `
            <div class="admin-dashboard">
                <div class="admin-header">
                    <h1>관리자 대시보드</h1>
                    <p>시스템 현황 및 통계</p>
                </div>

                <div class="admin-stats">
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="stat-content">
                            <h3>총 사용자</h3>
                            <p class="stat-number">${adminStatsData.totalUsers.toLocaleString()}</p>
                            <span class="stat-change positive">+${adminStatsData.newUsersToday} 오늘</span>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-exchange-alt"></i>
                        </div>
                        <div class="stat-content">
                            <h3>총 거래</h3>
                            <p class="stat-number">${adminStatsData.totalTransactions.toLocaleString()}</p>
                            <span class="stat-change positive">+${adminStatsData.transactionsToday} 오늘</span>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-won-sign"></i>
                        </div>
                        <div class="stat-content">
                            <h3>총 거래액</h3>
                            <p class="stat-number">${formatCurrency(adminStatsData.totalAmount)}원</p>
                            <span class="stat-change positive">+12.5% 이번 달</span>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-server"></i>
                        </div>
                        <div class="stat-content">
                            <h3>서버 상태</h3>
                            <p class="stat-status normal">정상</p>
                            <span class="stat-load">부하: ${adminStatsData.serverLoad}%</span>
                        </div>
                    </div>
                </div>

                <div class="admin-menu">
                    <div class="menu-section">
                        <h3>사용자 관리</h3>
                        <div class="menu-items">
                            <button class="menu-item">
                                <i class="fas fa-user-plus"></i>
                                <span>사용자 등록</span>
                            </button>
                            <button class="menu-item">
                                <i class="fas fa-users-cog"></i>
                                <span>사용자 관리</span>
                            </button>
                            <button class="menu-item">
                                <i class="fas fa-user-shield"></i>
                                <span>권한 관리</span>
                            </button>
                        </div>
                    </div>

                    <div class="menu-section">
                        <h3>시스템 관리</h3>
                        <div class="menu-items">
                            <button class="menu-item">
                                <i class="fas fa-database"></i>
                                <span>데이터베이스</span>
                            </button>
                            <button class="menu-item">
                                <i class="fas fa-cog"></i>
                                <span>시스템 설정</span>
                            </button>
                            <button class="menu-item">
                                <i class="fas fa-chart-bar"></i>
                                <span>통계 보고서</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `,
}

function getCategoryColor(category) {
  const colors = {
    급여: "#00C49F",
    쇼핑: "#FF9F40",
    이체: "#36A2EB",
    현금인출: "#9966FF",
    식음료: "#4BC0C0",
    이자: "#FFCD56",
  }
  return colors[category] || "#C9CBCF"
}

function getCategoryIcon(category) {
  const icons = {
    급여: "fas fa-money-bill-wave",
    쇼핑: "fas fa-shopping-bag",
    이체: "fas fa-paper-plane",
    현금인출: "fas fa-credit-card",
    식음료: "fas fa-coffee",
    이자: "fas fa-percentage",
  }
  return icons[category] || "fas fa-circle"
}
