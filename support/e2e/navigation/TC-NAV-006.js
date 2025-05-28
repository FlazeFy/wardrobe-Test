// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-NAV-006 - Navigation', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')

    it('User Can Open Clothes Detail From Clothes Reminder Information Box', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu "Clothes"
            cy.get('.navbar').contains('a', 'Clothes').click()
            cy.url().should('include', '/clothes')

            // Step 2: In the section All Clothes, there will be a information box of schedule that should be wear today with the day name
            cy.get('#schedule_reminder-section').should('exist').within(() => {
                cy.get('p').eq(1).invoke('text').then((text) => {
                    const today = new Date()
                    const expectedDay = today.toLocaleDateString(undefined, { weekday: 'long' })
                    const expectedText = `Today is ${expectedDay}`
                    expect(text.trim()).to.eq(expectedText)
                })
                cy.screenshot(`TC-NAV-006_Step-2-${date}`)

                // Step 3: Choose and open Clothes from the box, it should be on Clothes Detail Page
                cy.get('.box-schedule-mini').eq(1).click()
                cy.url().should('include','/clothes/detail')
            })
            cy.screenshot(`TC-NAV-006_Step-3-${date}`)
        })
    })
})
