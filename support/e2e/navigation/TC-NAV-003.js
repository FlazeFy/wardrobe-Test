// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-NAV-003 - Navigation', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')

    it('User Can Open Clothes Detail From Future Schedule', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu "Clothes"
            cy.get('.navbar').contains('a', 'Calendar').click()
            cy.url().should('include', '/calendar')

            // Step 2: Find section "Future Schedule". There will be two rows of item, The "Tommorow" and "Day after Tommorow" with its day
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            const tommorow_day_name = days[(new Date().getDay() + 1) % 7]
            const day_after_tommorow_day_name = days[(new Date().getDay() + 2) % 7]

            const list_header = ['Future Schedule',`Tommorow ${tommorow_day_name}`,`Day after Tommorow ${day_after_tommorow_day_name}`]
            list_header.forEach(dt => {
                cy.get('#tomorrow_schedule-section').contains(dt)
            })
            cy.screenshot(`TC-NAV-003_Step-2-${date}`)

            // Step 3: Choose and open Clothes from "Tommorow" section, it should be on Clothes Detail Page
            cy.get('#tomorrow_clothes-section.row .box-clothes').should('exist').first().click()
            cy.url().should('include','/clothes/detail')
            cy.screenshot(`TC-NAV-003_Step-3-${date}`)

            // Step 4: Back to Previous Page, and now for the "Day after Tommorow" section
            cy.go('back')
            cy.get('#day_after_tomorrow_clothes-section.row .box-clothes').should('exist').first().click()
            cy.url().should('include','/clothes/detail')
            cy.screenshot(`TC-NAV-003_Step-4-${date}`)
        })
    })
})
