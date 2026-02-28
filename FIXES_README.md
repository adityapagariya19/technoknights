# FIXES & CHANGE LOG

This file tracks all major updates, fixes, refactors, and feature additions.

---

## Sidebar.tsx
- Fixed incorrect animation library import

---

## Card Component
- Corrected React and tailwind-merge imports
- Fixed cn spread issue
- Replaced invalid prop destructuring
- Refactored component structure

---

## package.json
- Added required dependencies

---

## StatCard.tsx
- Created reusable StatCard component
- Supports string and number values
- Styled for dark theme with TailwindCSS
- Uses Card wrapper for layout consistency

---

## SettingsComponents.tsx (Initial)
- Added reusable UI components:
  - SettingsSection
  - ActionBtn (primary, secondary, danger variants)
  - ToggleSwitch (animated)
  - PillSelector (active state support)
  - StyledInput (label + optional right element)
- Fully typed with TypeScript
- Styled for dark theme

---

## SectorHeatmap.tsx (Enhancement)
- Dynamic background intensity based on % change
- Responsive grid (2/3/6 columns)
- Added Framer Motion hover animations
- Added aria-labels
- Improved contrast and UI polish

---

## MarketTable.tsx (Feature)
- Added MarketTable component
- Integrated SectorHeatmap
- 24h % color coding with arrow icons
- Add-to-watchlist dynamic state
- Row selection highlight
- Framer Motion row animation
- Fully responsive table

---

## LiveFeedSidebar.tsx (Feature)
- Added live blockchain block feed
- Displays block number, miner, txns, time, reward
- Scrollable layout
- Live pulse indicator
- Framer Motion animations
- Dark dashboard styling

---

## GainersLosersGrid.tsx
- Added PlayPokerLoseMoney component
- Created reusable TokenList subcomponent
- Integrated Framer Motion animations
- Styled responsive grid layout
- Fixed missing imports (Card, ArrowUpRight, ArrowDownRight)

---

## DashboardLayout.tsx
- Extracted reusable DashboardLayout
- Moved Sidebar and Header into layout
- Preserved spacing and dark theme
- No business logic changes

---

## Dashboard.tsx
- Integrated DashboardLayout
- Removed inline Sidebar/Header
- Preserved charts, sorting, watchlist logic
- Maintained layout structure

---

## MarketTable.tsx (Refactor)
- Refactored to use Framer Motion
- Fixed invalid import
- Corrected export typo
- Added missing props interface
- Removed stray character
- Restored motion row structure

---

## SectorHeatmap.tsx (Fix)
- Removed invalid JSX
- Fixed broken imports
- Properly typed props (Sector interface)
- Added motion animations
- Corrected Tailwind layout
- Dynamic market cap and % display

---

## SettingsComponents.tsx (Refactor)
- Implemented SettingsSection wrapper
- Improved ActionBtn variants
- Added ToggleSwitch logic
- Refined PillSelector behavior
- Enhanced StyledInput
- Fully aligned with Dashboard layout

---

## LiveFeedSidebar.tsx (Fix)
- Fixed invalid imports
- Corrected interface naming
- Fixed props typing
- Removed duplicate className
- Repaired broken JSX

---

## GainersLosersGrid.tsx (Update)
- Reinforced TokenList reuse
- Maintained animations
- Confirmed import fixes
Update Sidebar.tsx
Fixed incorrect animation library import



Refactor Card component and update imports
Correct React and tailwind-merge imports, fix cn spread, and replace invalid prop destructuring in Card component

Update package.json
Added Dependencies


Update StatCard.tsx
Add StatCard component for displaying key metrics

- Reusable card component with title and value.
- Styled for dark theme with TailwindCSS.
- Supports both string and number values.
- Uses Card wrapper for consistent layout.

Update SettingsComponents.tsx
Add reusable UI components for settings and forms

- SettingsSection: Container for settings with optional description.
- ActionBtn: Buttons with primary, secondary, and danger variants.
- ToggleSwitch: Animated on/off toggle switch.
- PillSelector: Selectable pill buttons with active state.
- StyledInput: Input fields with label and optional right element.
- All components styled for dark theme with TailwindCSS.
- Fully typed with TypeScript for props safety.

Update SectorHeatmap.tsx
Enhance SectorHeatmap component

- Added dynamic background color intensity based on sector % change.
- Improved responsive grid for small (2 cols), medium (3 cols), and large (6 cols) screens.
- Added smooth hover scaling animation with Framer Motion.
- Added aria-labels for accessibility.
- Maintained current layout styles for varied block sizes.
- Minor UI improvements for text contrast and hover effects.

Update MarketTable.tsx
feat: Add MarketTable and SectorHeatmap components

- SectorHeatmap displays up to 6 sectors with market cap and % change
- Heatmap block color intensity represents magnitude of change (green/red)
- MarketTable shows coins with Name, Price, 24h %, Market Cap, Action
- 24h % changes display up/down arrow icons with color coding
- Add-to-watchlist button dynamically changes icon based on state
- Row selection highlights with bg color; row click triggers selection
- Integrated Framer Motion for smooth row entry animation
- Fully responsive table with horizontal scrolling and Tailwind styling

Update LiveFeedSidebar.tsx
feat: Add LiveFeedSidebar component

- Display latest blockchain blocks in a live feed sidebar
- Includes block number, miner, txns, time ago, and reward
- Added framer-motion animations for smooth entry/exit
- Styled with Tailwind CSS for dark dashboard theme
- Scrollable layout with live indicator pulse

Update GainersLosersGrid.tsx
Add PlayPokerLoseMoney component with Gainers/Losers list

- Added TokenList subcomponent for reusable gainers/losers display
- Integrated framer-motion for smooth entry animations
- Styled using Tailwind for responsive grid and card layout
- Fixed missing imports: Card, ArrowUpRight, ArrowDownRight

Update Dashboard.tsx
refactor(dashboard): integrate DashboardLayout and preserve existing functionality

- Wrapped Dashboard content with reusable DashboardLayout
- Removed inline Sidebar and Header from Dashboard
- Preserved all existing UI, chart rendering, sorting, and watchlist logic
- Maintained layout spacing (pl-64) and dark theme styling
- No behavioral or business logic changes introduced

Update DashboardLayout.tsx
feat(layout): extract DashboardLayout component

- Created reusable DashboardLayout wrapper
- Moved Sidebar and Header into layout component
- Preserved existing UI structure and styling
- Maintained pl-64 layout spacing and dark theme
- No functional changes to Dashboard logic

Refactor MarketTable to use framer-motion
Fixed invalid import, corrected export typo, added missing props interface, removed stray character, and restored broken motion table row structure.

Update SectorHeatmap.tsx
Fix SectorHeatmap component

- Remove invalid JSX and broken imports
- Properly type props with Sector interface
- Add motion animations for each sector block
- Correct Tailwind layout and styling
- Display market cap and change percentage dynamically

Update SettingsComponents.tsx
feat(ui): add reusable SettingsComponents

- Implemented SettingsSection wrapper component
- Added ActionBtn with primary/secondary/danger variants
- Created ToggleSwitch component for boolean settings
- Implemented PillSelector for selectable options
- Added StyledInput with optional right element support
- Fully aligned with existing Dashboard layout and props

Update LiveFeedSidebar.tsx
Fixed invalid imports, corrected interface naming and props typing, removed duplicate className, and repaired broken JSX structure.

Update GainersLosersGrid.tsx
Add PlayPokerLoseMoney component with Gainers/Losers list

- Added TokenList subcomponent for reusable gainers/losers display
- Integrated framer-motion for smooth entry animations
- Styled using Tailwind for responsive grid and card layout
- Fixed missing imports: Card, ArrowUpRight, ArrowDownRight



