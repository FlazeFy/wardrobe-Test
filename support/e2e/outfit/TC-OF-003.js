// Components
import { generateMonthName } from '../../components/generate'
import '../../components/template'

describe('Wardrobe E2E Test - TC-OF-003 - Outfit', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')

    it('User Can See Used History For Specific Outfit', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu "Clothes"
            cy.get('.navbar').contains('a', 'Clothes').click()
            cy.url().should('include', '/clothes')

            // Step 2: In the Clothes Page, Click button "Generated Outfit"
            cy.contains('a','Generated Outfit').click()
            cy.url().should('include', '/clothes/generated')
            // Evidence - Step 2
            cy.screenshot(`TC-OF-003_Step-2-${date}`)

            // Step 3: Find section "My Outfit", choose and click the first item
            cy.get('h1').contains('My Outfit')
            cy.get('#outfit-holder .box-clothes').first().click()

            // Step 4: In the specific Outfit Detail Page, Find section "Used History", and there will be a table with date of used and delete button
            cy.url().should('include','clothes/outfit')
            cy.get(`#used_history-section`).contains('Used History')
            const tableHeaders = ['Used At','Delete']
            cy.get('#used_history-table').within(() => {
                // Validate table headers
                cy.get('thead tr th').each(($th, index) => {
                    cy.wrap($th).should('have.text', tableHeaders[index])
                })
            
                // Validate tbody
                cy.get('tbody tr').each(($row) => {
                    cy.wrap($row).within(() => {
                        // All tds must be filled
                        cy.get('td').each(($td, idx) => {
                            if(idx != tableHeaders.length - 1){
                                cy.wrap($td).invoke('text').should('not.be.empty')
                            }
                        })
            
                        // Action must contain delete button
                        cy.get('td').last().within(() => {
                            cy.get('button.btn-delete').should('exist')
                        })
                    })
                })
            })  
            
            // Evidence - Step 4
            cy.screenshot(`TC-OF-003_Step-4-${date}`)
        })
    })
})
