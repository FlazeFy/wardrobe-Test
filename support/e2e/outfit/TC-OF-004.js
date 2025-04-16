// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-OF-004 - Outfit', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')

    it('User Can See Attached Clothes For Specific Outfit', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu "Clothes"
            cy.get('.navbar').contains('a', 'Clothes').click()
            cy.url().should('include', '/clothes')

            // Step 2: In the Clothes Page, Click button "Generated Outfit"
            cy.contains('a','Generated Outfit').click()
            cy.url().should('include', '/clothes/generated')
            // Evidence - Step 2
            cy.screenshot(`TC-OF-004_Step-2-${date}`)

            // Step 3: Find section "My Outfit", choose and click the first item who have clothes attached
            cy.get('h1').contains('My Outfit')
            cy.get('#outfit-holder .box-clothes').each($el => {
                const hasCol = Cypress.$($el).find('.clothes-holder [class^="col-"]').length > 0
                if (hasCol) {
                    cy.wrap($el).click()
                    return false 
                }
            })
            
            // Step 4: In the specific Outfit Detail Page, Find section "Attached Clothes", and there will be list of attached clothes
            cy.url().should('include','clothes/outfit')
            cy.get(`#attached_clothes-section`).contains('Attached Clothes')
            cy.get('#attached_clothes-section .row .box-clothes').each($el => {
                // Clothes Type & Clothes Name
                cy.wrap($el).find('h6').should('exist').and('contain.text', '|')
                // Clothes Image
                cy.wrap($el).find('.img-clothes').should('exist')
                // Clothes Merk
                cy.wrap($el).find('p').should('exist').and('not.be.empty')
            })
            
            // Evidence - Step 4
            cy.screenshot(`TC-OF-004_Step-4-${date}`)
        })
    })
})
