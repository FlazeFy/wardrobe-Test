describe('Wardrobe E2E Test - TC-NAV-002 - Navigation', () => {
    const BASEURL = 'http://localhost:3000'
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')

    it('Validate The Menu List For A Signed In User', () => {
        // Step 1: Visit Login Page
        cy.visit(`${BASEURL}/`)

        // Step 2: Fill in Login form
        cy.get('#username-input').type(username)
        cy.get('#password-input').type(password)

        // Evidence - Step 2
        cy.screenshot(`TC-NAV-002_Step-2-${date}`)

        // Step 3: Click Submit button
        cy.get('#submit-login-button').click()
        
        // Step 4: After Validation Process, a Success Pop-Up will appear. Click Okay! to proceed
        cy.get('.swal2-popup', { timeout: 5000 }).should('exist')
        .then(() => {
            cy.screenshot(`TC-NAV-002_Step-3-${date}`)
            cy.get('.swal2-popup').contains('button', 'Okay!').click()
        })

        // Step 5: Check if navbar exists
        cy.get('.navbar', { timeout: 5000 }).should('exist')
        cy.screenshot(`TC-NAV-002_Step-5-${date}`)

        // Step 6: Validate menu items
        const listMenu = ['home', 'clothes', 'calendar', 'stats', 'feedback', 'about us', username]
        cy.get('.navbar a').should('have.length', listMenu.length)
        cy.get('.navbar a').each(($el) => {
            cy.wrap($el).invoke('text').then((text) => {
                expect(listMenu).to.include(text.toLowerCase().trim())
            })
        })
    })
})
