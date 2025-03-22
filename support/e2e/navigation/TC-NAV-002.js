// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-NAV-002 - Navigation', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')

    it('Validate The Menu List For A Signed In User', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. Check if navbar exists
            cy.get('.navbar', { timeout: 5000 }).should('exist')
            cy.screenshot(`TC-NAV-002_Step-1-${date}`)

            // Step 2: Validate menu items
            const listMenu = ['home', 'clothes', 'calendar', 'stats', 'feedback', 'about us', username]
            cy.get('.navbar a').should('have.length', listMenu.length)
            cy.get('.navbar a').each(($el) => {
                cy.wrap($el).invoke('text').then((text) => {
                    expect(listMenu).to.include(text.toLowerCase().trim())
                })
            })

            cy.screenshot(`TC-NAV-001_Step-2-${date}`)
        })
    })
})
