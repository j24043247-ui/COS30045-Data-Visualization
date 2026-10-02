# Power Appliances Website

## Overview

Power Appliances is a three-page HTML website created for a web development exercise. The website presents placeholder information about appliance energy consumption in the Australian market and includes an interactive appliance energy calculator implemented using vanilla JavaScript.

## Pages

The website contains three required pages:

1. **Home (`index.html`)**
   - Appliance energy consumption introduction
   - Interactive Appliance Energy Calculator
   - FAQ accordion using JavaScript

2. **Televisions (`televisions.html`)**
   - Placeholder information about television energy consumption
   - Energy-saving habits
   - Example energy calculation

3. **About Us (`about.html`)**
   - Project purpose
   - Project goals
   - Technologies demonstrated
   - Educational-content disclaimer

## Folder Structure

```text
/
├── index.html
├── televisions.html
├── about.html
├── README.md
│
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── script.js
    └── img/
        └── PowerIcon.png
```

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript

No external JavaScript libraries or frameworks are required.

## Navigation

The same navigation menu is included on all three pages.

- The Power logo appears in the top-left corner.
- Clicking the logo returns the user to `index.html`.
- Navigation links connect all three pages.
- The current page is identified using the `active` navigation class.
- Navigation links include hover and focus effects.
- A responsive mobile navigation menu is implemented with JavaScript.

## FAQ Accordion

The Home page contains an FAQ section.

The answers are hidden by default. JavaScript listens for clicks on each FAQ question and changes the answer between its hidden and visible states.

The accordion uses:

- DOM selection
- Event listeners
- `aria-expanded` state
- CSS classes
- Dynamic interaction

## Energy Calculator

The Home page includes an optional interactive Appliance Energy Calculator.

### Inputs

The calculator accepts:

- Appliance power usage in watts
- Average hours of use per day
- Electricity price in cents per kWh

### Calculations

The calculator calculates:

```text
Daily energy (kWh)
= (Power in watts × Hours per day) ÷ 1000

Monthly energy (kWh)
= Daily energy × 30

Yearly energy (kWh)
= Daily energy × 365

Estimated monthly cost
= Monthly energy × Electricity price ÷ 100

Estimated yearly cost
= Yearly energy × Electricity price ÷ 100
```

### Validation

JavaScript validates the entered values.

- Power must be greater than 0.
- Hours must be between 0 and 24.
- Electricity price must be 0 or greater.
- Invalid inputs are highlighted.
- User-friendly feedback is displayed in the results panel.
- Browser alerts are not used.

## Styling

All website styling is contained in:

```text
assets/css/style.css
```

The pages use a shared colour scheme based around blue/cyan tones to complement the provided Power logo.

No inline CSS is used.

## JavaScript

All JavaScript behaviour is contained in:

```text
assets/js/script.js
```

The JavaScript handles:

- Current year in the footer
- FAQ accordion interaction
- Energy calculator calculations
- Input validation
- Dynamic result updates
- Responsive mobile navigation

No external JavaScript library or framework is used.

## Footer

A footer appears on every page and contains:

- The current year
- Placeholder author name: **Your Name**
- Generative AI acknowledgement

Replace **Your Name** with the student's actual name before submission.

## Logo

Place the provided logo file in:

```text
assets/img/PowerIcon.png
```

The HTML already references this path.

## Running the Website

No server is required for the basic website.

Open `index.html` in a modern web browser. The navigation links should then allow movement between the three pages.

For the best development experience, the files can also be opened using a local development server such as the Live Server extension in Visual Studio Code.

## Generative AI Acknowledgement

Generative AI was used to assist with the development of the website structure, placeholder content, CSS styling, JavaScript functionality, calculator logic and documentation.

The final implementation should be reviewed, understood and modified by the student as necessary before submission.

## Important Before Submission

1. Replace `Your Name` in all three HTML footers with your actual name.
2. Put the provided `PowerIcon.png` inside `assets/img/`.
3. Test every navigation link.
4. Test the FAQ accordion.
5. Test the calculator with valid and invalid inputs.
6. Test the website after refreshing each page.
7. Check the website at desktop and mobile screen sizes.
8. Review the code and make sure you understand the HTML, CSS and JavaScript used.
