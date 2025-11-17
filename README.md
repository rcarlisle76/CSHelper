# Credit Tracker - Desktop App

A desktop application to help you track your credit card utilization and keep it under 30% to improve your credit score.

Built with Electron, this app runs natively on Windows, macOS, and Linux.

## Why 30% Matters

Credit utilization (the percentage of your available credit that you're using) is one of the most important factors in your credit score. Keeping your utilization below 30% across all cards is recommended by financial experts to maintain and improve your credit score.

## Features

- **Add Multiple Credit Cards**: Track all your credit cards in one place
- **Real-Time Calculations**: Automatically calculates individual card utilization and overall utilization
- **Visual Progress Tracking**: Color-coded indicators show your status at a glance
  - Green: Under 25% (Excellent)
  - Yellow: 25-30% (Warning)
  - Red: Over 30% (Take action)
- **30% Goal Marker**: Visual indicator shows where the 30% threshold is
- **Update Balances**: Quickly update card balances as they change
- **Data Persistence**: Your data is saved locally in your browser
- **Mobile Responsive**: Works on desktop, tablet, and mobile devices

## How to Use

### Getting Started

1. Open `index.html` in your web browser
2. The app will load with no cards (empty state)

### Adding a Credit Card

1. Fill in the "Add New Credit Card" form:
   - **Card Name**: e.g., "Chase Freedom", "Discover It"
   - **Credit Limit**: Your total credit limit for this card
   - **Current Balance**: How much you currently owe
2. Click "Add Card"
3. The card will appear in your cards list below

### Updating Card Balances

As you make purchases or payments:
1. Find the card in your list
2. Update the "Update Balance" field
3. The utilization will automatically recalculate

### Deleting a Card

Click the "Delete" button on any card to remove it from tracking.

### Monitoring Your Progress

The summary at the top shows:
- **Total Credit Limit**: Sum of all your cards' limits
- **Total Balance Used**: Sum of all your current balances
- **Overall Utilization**: Your total utilization percentage

The progress bar provides visual feedback:
- Watch the bar grow as utilization increases
- The red vertical line marks the 30% goal
- Color changes from green → yellow → red as you approach/exceed 30%

## Example Scenario

Let's say you have:
- **Card A**: $5,000 limit, $1,000 balance (20% utilization)
- **Card B**: $10,000 limit, $2,000 balance (20% utilization)

Your overall utilization would be:
- Total Limit: $15,000
- Total Balance: $3,000
- Overall Utilization: 20% ✓ (Under 30% goal)

## Tips for Staying Under 30%

1. **Pay down high-utilization cards first**: If one card is over 30%, focus on paying that one down
2. **Make multiple payments per month**: You don't have to wait for your statement
3. **Request credit limit increases**: This increases your available credit (but don't use it!)
4. **Use this app before making large purchases**: Check if a purchase will push you over 30%

## Technical Details

- **Platform**: Electron (cross-platform desktop app)
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Storage**: localStorage (data stays on your device)
- **No Backend Required**: Runs entirely on your computer
- **Privacy**: Your financial data never leaves your device

## System Requirements

- **Windows**: Windows 10 or later
- **macOS**: macOS 10.13 or later
- **Linux**: Ubuntu 18.04+, Fedora 32+, Debian 10+

## Installation & Running

### Option 1: Run in Development Mode

1. **Install Node.js** (if not already installed)
   - Download from https://nodejs.org/ (LTS version recommended)

2. **Clone or download this repository**
   ```bash
   git clone <your-repo-url>
   cd CSHelper
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Run the app**
   ```bash
   npm start
   ```

### Option 2: Build Standalone Executable

Build a distributable app for your operating system:

**For Windows:**
```bash
npm run build:win
```
This creates an installer in the `dist/` folder.

**For macOS:**
```bash
npm run build:mac
```
This creates a .dmg file in the `dist/` folder.

**For Linux:**
```bash
npm run build:linux
```
This creates an AppImage and .deb package in the `dist/` folder.

**For all platforms:**
```bash
npm run build:all
```

### Installing the Built App

After building:
1. Navigate to the `dist/` folder
2. Run the installer for your platform:
   - **Windows**: Run the `.exe` installer
   - **macOS**: Open the `.dmg` and drag to Applications
   - **Linux**: Run the `.AppImage` or install the `.deb` package

## Desktop App Features

Additional features available in the desktop version:

- **Menu Bar**: File, Edit, View, and Help menus
- **Keyboard Shortcuts**:
  - `Ctrl/Cmd + Q`: Quit
  - `Ctrl/Cmd + Shift + I`: Developer Tools
  - Standard edit shortcuts (Cut, Copy, Paste)
- **Clear All Data**: File → Clear All Data (with confirmation)
- **Window Controls**: Minimize, maximize, close like any desktop app
- **Offline**: Works completely offline, no internet required

## Data Privacy

All your credit card information is stored locally on your computer using Electron's localStorage. No data is sent to any server or cloud service. Your financial information stays completely private and secure on your device.

## License

This project is open source and available for personal use.

## Disclaimer

This app is for tracking purposes only. Always refer to your actual credit card statements for official balances and ensure you're making payments on time.
