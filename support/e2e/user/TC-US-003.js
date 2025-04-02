// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-US-003 - User', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')

    it('User Can See Their History', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu button that contain username to open the Profile Page
            cy.get('.navbar').contains('a', username).click()
            cy.url().should('include', '/profile')

            // Step 2: In the "My History" section, user can see list of history context, datetime, and delete button
            cy.get(`#history-section`).contains('My History')
            cy.get('#history-section .history-box').each($el => {
                // History Context
                cy.wrap($el).find('h6').should('exist').and('not.be.empty')
                // History Created At
                cy.wrap($el).find('p.mb-0.text-secondary').should('exist').and('not.be.empty')
                // Delete Button
                cy.wrap($el).find('button.btn-danger svg').should('exist')
            })

            // Evidence - Step 2
            cy.screenshot(`TC-US-003_Step-2-${date}`)
        })
    })
})
