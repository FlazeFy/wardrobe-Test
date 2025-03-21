// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-US-002 - User', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')

    it('User Can See Their Welcoming Message Contain Username After Signed In Landing', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Back to Landing Page
            cy.get('.navbar').contains('a', 'Home').click()
            cy.url().should('include', '/')

            // Step 2: At the top of the page, User can see title welcoming their username
            cy.get('#welcome-section').within(() => {
                cy.get('h2').last().invoke('text').then(text => {
                    expect(text).to.be.a.equal(`Welcome, ${username}`)
                })
            })

            // Evidence - Step 2
            cy.screenshot(`TC-US-002_Step-2-${date}`)
        })
    })
})
