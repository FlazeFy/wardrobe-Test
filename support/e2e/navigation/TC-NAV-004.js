// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-NAV-004 - Navigation', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')

    it('User Can Open Clothes Detail From All Clothes List', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu "Clothes"
            cy.get('.navbar').contains('a', 'Clothes').click()
            cy.url().should('include', '/clothes')

            // Step 2: Choose and open Clothes from "All Clothes" section, it should be on Clothes Detail Page
            cy.get('h2').contains('All Clothes')
            cy.get('#clothes_holder .box-clothes').should('exist').first().find('.btn-detail').click()
            cy.url().should('include','/clothes/detail')
            cy.screenshot(`TC-NAV-004_Step-2-${date}`)
        })
    })
})
