// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-AU-005 - Auth', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')

    it('User Can Sign Out From The Apps', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu button that contain username to open the Profile Page
            cy.get('.navbar').contains('a', username).click()
            cy.url().should('include', '/profile')

            // Step 2: Find and Click "Sign Out" button
            cy.screenshot(`TC-AU-005_Step-2-${date}`)
            cy.get('#sign_out-button').click()

            // Step 3: In the Pop-Up Sign Out Validation with text "Want to sign out from this account?", Click "Yes, Sign Out!"
            cy.get('.swal2-popup', { timeout: 5000 }).should('exist')
            .then(() => {
                cy.screenshot(`TC-AU-005_Step-3-${date}`)
                cy.get('.swal2-popup').contains('Want to sign out from this account?')
                cy.get('.swal2-popup').contains('button', 'Yes, Sign Out!').click()
            })
            
            // Step 4: After Validation Process, a Success Pop-Up will appear. Click Okay! to proceed
            cy.get('.swal2-popup', { timeout: 5000 }).should('exist')
            .then(() => {
                cy.screenshot(`TC-AU-005_Step-4-${date}`)
                cy.get('.swal2-popup').contains('logout success')
                cy.get('.swal2-popup').contains('button', 'Okay!').click()
            })

            // Expected Result
            cy.url().should('include', '/')

            // Evidence - Step 4
            cy.screenshot(`TC-AU-005_Step-4-${date}`)
        })
    })
})
