// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-US-004 - User', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')

    it('User Can See Their Account Date Props', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu button that contain username to open the Profile Page
            cy.get('.navbar').contains('a', username).click()
            cy.url().should('include', '/profile')

            // Step 2: In the props profile section, you can see the created date and updated date of the account
            cy.get('#props_profile-section h4').each($el => {
                // Profile Datetime Props
                cy.wrap($el).should('exist').and('not.be.empty').invoke('text').then((text) => {
                    const datePattern = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/  // YYYY-MM-DD HH:MM
                    expect(text.trim()).to.match(datePattern)
                })
            })
            cy.get('#props_profile-section h1').first().invoke('text').then((text) => {
                expect(text.trim()).to.equal('Joined Since')
            })
            cy.get('#props_profile-section h1').last().invoke('text').then((text) => {
                expect(text.trim()).to.equal('Last Updated')
            })

            // Evidence - Step 2
            cy.screenshot(`TC-US-004_Step-2-${date}`)
        })
    })
})
