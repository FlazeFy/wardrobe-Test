// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-OF-005 - Outfit', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')

    it('User Can See Outfit Detail', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu "Clothes"
            cy.get('.navbar').contains('a', 'Clothes').click()
            cy.url().should('include', '/clothes')

            // Step 2: In the Clothes Page, Click button "Generated Outfit"
            cy.contains('a','Generated Outfit').click()
            cy.url().should('include', '/clothes/generated')
            // Evidence - Step 2
            cy.screenshot(`TC-OF-005_Step-2-${date}`)

            // Step 3: Find section "My Outfit", choose and click the first item
            cy.get('h1').contains('My Outfit')
            cy.get('#outfit-holder .box-clothes').first().click()
            
            // Step 4: In the specific Outfit Detail Page, you will find outfit name, total used, last used, and outfit note
            cy.url().should('include','clothes/outfit')
            // Outfit Name
            cy.get('h1').should('exist').and('not.be.empty')    
            cy.get('h2').contains('Outfit Name').should('exist').then($h2 => {
                cy.wrap($h2).next('h4').should('exist').and('not.be.empty')
            })
            // Total Used
            cy.get('h2').contains('Total Used').should('exist').then($h2 => {
                cy.wrap($h2).next('h4').should('exist').and('not.be.empty')
                const $total_used = $h2.next('h4')
                const number = parseInt($total_used.text().trim())
                expect(number).to.be.a('number').to.be.at.least(1)
            })
            // Last Used
            cy.get('h2').contains('Last Used').should('exist').then($h2 => {
                cy.wrap($h2).next('h4').should('exist').and('not.be.empty')
            })          
            // Outfit Note
            cy.get('p.outfit-note').invoke('text').then((text) => {
                const trimmed = text.trim()
                expect(trimmed).to.satisfy(t => t === '- No Description Provided -' || t.length > 0)
            })     

            // Evidence - Step 4
            cy.screenshot(`TC-OF-005_Step-4-${date}`)
        })
    })
})
