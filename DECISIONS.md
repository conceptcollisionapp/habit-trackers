# Build Decisions

### What was built
A React-based bill splitter web application, "NightSplit," developed using Vite. The app calculates per-person bill splits for any number of people, including tip percentages. It features a user-friendly interface with a dark theme, responsive design, and precise mathematical calculations for distributing cents.

### Key Technical Decisions

1.  **Vite + React Framework:** The project was built using Vite for a fast development environment and React for component-based UI development. This decision was established early after an initial structural inconsistency, streamlining the development workflow.
2.  **Precise Integer-Based Rounding Logic:**
    *   **Initial Flaw:** Grok's first attempt at rounding was incorrect, leading to overcharging the total bill in certain scenarios by adding a flat `0.01` to everyone's share if any remainder existed.
    *   **Resolution:** Claude identified this critical flaw and explained the need for an accurate distribution of leftover cents. Grok then implemented a mathematically sound solution by converting the total bill to cents (`totalCents`), calculating a base share in cents (`baseCents`), determining the exact `remainderCents`, and then explicitly distributing `basePerPerson + 0.01` to the number of people equal to `remainderCents`, while the rest pay `basePerPerson`. This ensures the sum of individual payments always exactly matches the total bill.
3.  **Robust and Intuitive Input Handling:**
    *   **Clamping Numerical Values:** `Math.max(0, parseFloat(bill) || 0)` and `Math.max(1, parseInt(people) || 1)` were used to ensure bill amounts are non-negative and the number of people is at least one, preventing invalid calculations.
    *   **String-backed Input State for UI Consistency:** To resolve a common UI glitch where input fields would display as empty but silently use default numerical values for calculations, the `bill` and `people` state variables were switched to store raw string values. This allows input fields to visually reflect an empty state while the parsing logic (`parseFloat`/`parseInt`) handles the numerical conversion and clamping.
    *   **Input Constraints for "Number of People":** `type="number"`, `step="1"`, and `inputMode="numeric"` were added to guide users towards integer input for the number of people, enhancing UX, although `parseInt` already handles truncation of decimals gracefully.
4.  **Comprehensive Tip Options:** The app includes `0%` as a tip option alongside standard percentages (10%, 15%, 20%, 25%), accommodating various user preferences and situations where a tip might not be applicable.
5.  **Enhanced UI/UX and Accessibility:**
    *   **Clearer Result Display:** The result headline was updated from "Each person pays" to "Per-person split" to more accurately convey the breakdown when cents don't divide evenly. The specific breakdown (e.g., "X people pay Y, Z people pay W") is conditionally displayed only when `extraPayers > 0`.
    *   **Accessibility (A11y):** All input `label` elements were correctly associated with their respective `input` fields using `htmlFor` and `id` attributes, improving usability for keyboard navigation and screen readers.
    *   **Styling:** A consistent, modern dark-themed CSS styling was applied, enhancing the visual appeal and user experience.

### Disagreements and Resolutions

*   **Initial Project Structure:** Claude identified an inconsistent project structure (e.g., `index.html` in `public/` with a manual script tag) that did not align with standard Vite/React project conventions. Grok promptly resolved this by adopting the correct Vite project structure.
*   **Mathematical Rounding Accuracy:** This was the most significant point of disagreement. Claude rigorously tested Grok's initial rounding logic, demonstrating how it led to incorrect totals. Grok subsequently implemented Claude's recommended integer-based cents distribution method, which Claude then verified as mathematically sound and correct.
*   **Empty Input Field UI State:** Claude repeatedly flagged a UI/UX issue where input fields could appear empty while the underlying calculations defaulted to a non-empty value (e.g., `0` or `1`). Grok initially addressed the calculation aspect with `Math.max` clamping, and later fully resolved the UI inconsistency by storing input values as strings in state, allowing fields to genuinely appear blank.

### Unresolved Concerns

*   **Custom Tip Input:** While preset tip options are provided, the application does not offer a mechanism for users to input a custom tip percentage. This was noted as a feature gap rather than a bug, deemed acceptable for the "simple fun app" scope.
*   **Exotic Bill Input Formats:** The `type="number"` input for the bill field, when combined with string state and `parseFloat`, allows for less common numerical inputs like scientific notation (`1e3`), which `parseFloat` correctly interprets (e.g., 1000). While functional, this was flagged as a minor edge case related to browser behavior and not considered a defect requiring further code changes for the current scope.