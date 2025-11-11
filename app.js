// Credit Card Tracker Application
class CreditTracker {
    constructor() {
        this.cards = this.loadCards();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.render();
    }

    setupEventListeners() {
        const form = document.getElementById('cardForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addCard();
        });
    }

    loadCards() {
        const stored = localStorage.getItem('creditCards');
        return stored ? JSON.parse(stored) : [];
    }

    saveCards() {
        localStorage.setItem('creditCards', JSON.stringify(this.cards));
    }

    addCard() {
        const name = document.getElementById('cardName').value.trim();
        const limit = parseFloat(document.getElementById('creditLimit').value);
        const balance = parseFloat(document.getElementById('currentBalance').value);

        if (!name || isNaN(limit) || isNaN(balance)) {
            alert('Please fill in all fields with valid values');
            return;
        }

        if (balance > limit) {
            alert('Current balance cannot exceed credit limit');
            return;
        }

        const card = {
            id: Date.now(),
            name,
            limit,
            balance
        };

        this.cards.push(card);
        this.saveCards();
        this.render();

        // Reset form
        document.getElementById('cardForm').reset();
    }

    updateCard(id, field, value) {
        const card = this.cards.find(c => c.id === id);
        if (card) {
            card[field] = parseFloat(value);

            // Validate balance doesn't exceed limit
            if (card.balance > card.limit) {
                alert('Balance cannot exceed credit limit');
                card.balance = card.limit;
            }

            this.saveCards();
            this.render();
        }
    }

    deleteCard(id) {
        if (confirm('Are you sure you want to delete this card?')) {
            this.cards = this.cards.filter(c => c.id !== id);
            this.saveCards();
            this.render();
        }
    }

    calculateUtilization() {
        if (this.cards.length === 0) {
            return {
                totalLimit: 0,
                totalBalance: 0,
                utilization: 0
            };
        }

        const totalLimit = this.cards.reduce((sum, card) => sum + card.limit, 0);
        const totalBalance = this.cards.reduce((sum, card) => sum + card.balance, 0);
        const utilization = totalLimit > 0 ? (totalBalance / totalLimit) * 100 : 0;

        return {
            totalLimit,
            totalBalance,
            utilization
        };
    }

    getUtilizationClass(utilization) {
        if (utilization >= 30) return 'danger';
        if (utilization >= 25) return 'warning';
        return 'success';
    }

    getStatusMessage(utilization) {
        if (utilization === 0) {
            return { text: 'Add your credit cards to start tracking', class: 'success' };
        }
        if (utilization < 25) {
            return {
                text: `Great job! You're at ${utilization.toFixed(1)}% utilization. Keep it under 30%!`,
                class: 'success'
            };
        }
        if (utilization < 30) {
            return {
                text: `You're at ${utilization.toFixed(1)}% utilization. Getting close to the 30% threshold.`,
                class: 'warning'
            };
        }
        return {
            text: `Warning! You're at ${utilization.toFixed(1)}% utilization. Try to get below 30% to improve your credit score.`,
            class: 'danger'
        };
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    renderSummary() {
        const { totalLimit, totalBalance, utilization } = this.calculateUtilization();
        const utilizationClass = this.getUtilizationClass(utilization);
        const status = this.getStatusMessage(utilization);

        // Update summary values
        document.getElementById('totalLimit').textContent = this.formatCurrency(totalLimit);
        document.getElementById('totalBalance').textContent = this.formatCurrency(totalBalance);

        const utilizationElement = document.getElementById('overallUtilization');
        utilizationElement.textContent = `${utilization.toFixed(1)}%`;
        utilizationElement.className = `value utilization-value ${utilizationClass}`;

        // Update progress bar
        const progressBar = document.getElementById('progressBar');
        const width = Math.min(utilization, 100);
        progressBar.style.width = `${width}%`;
        progressBar.className = `progress-bar ${utilizationClass}`;

        // Update status message
        const statusElement = document.getElementById('statusMessage');
        statusElement.textContent = status.text;
        statusElement.className = `status-message ${status.class}`;
    }

    renderCards() {
        const cardsList = document.getElementById('cardsList');

        if (this.cards.length === 0) {
            cardsList.innerHTML = '<p class="empty-state">No credit cards added yet. Add your first card above!</p>';
            return;
        }

        cardsList.innerHTML = this.cards.map(card => {
            const utilization = card.limit > 0 ? (card.balance / card.limit) * 100 : 0;
            const utilizationClass = this.getUtilizationClass(utilization);
            const available = card.limit - card.balance;

            return `
                <div class="card-item">
                    <div class="card-header">
                        <div class="card-name">${this.escapeHtml(card.name)}</div>
                        <button class="btn btn-danger" onclick="tracker.deleteCard(${card.id})">Delete</button>
                    </div>
                    <div class="card-details">
                        <div class="card-detail">
                            <span class="card-detail-label">Credit Limit</span>
                            <span class="card-detail-value">${this.formatCurrency(card.limit)}</span>
                        </div>
                        <div class="card-detail">
                            <span class="card-detail-label">Current Balance</span>
                            <span class="card-detail-value">${this.formatCurrency(card.balance)}</span>
                        </div>
                        <div class="card-detail">
                            <span class="card-detail-label">Available Credit</span>
                            <span class="card-detail-value">${this.formatCurrency(available)}</span>
                        </div>
                    </div>
                    <div class="card-utilization">
                        <div class="utilization-text ${utilizationClass}">
                            Utilization: <strong>${utilization.toFixed(1)}%</strong>
                        </div>
                        <div class="utilization-bar-container">
                            <div class="utilization-bar ${utilizationClass}" style="width: ${Math.min(utilization, 100)}%"></div>
                        </div>
                    </div>
                    <div style="margin-top: 15px; display: flex; gap: 10px;">
                        <div style="flex: 1;">
                            <label style="font-size: 0.85em; margin-bottom: 5px;">Update Balance ($)</label>
                            <input type="number"
                                   value="${card.balance}"
                                   min="0"
                                   max="${card.limit}"
                                   step="0.01"
                                   onchange="tracker.updateCard(${card.id}, 'balance', this.value)"
                                   style="width: 100%; padding: 8px;">
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    render() {
        this.renderSummary();
        this.renderCards();
    }
}

// Initialize the app
const tracker = new CreditTracker();
