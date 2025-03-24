// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-TR-001 - Trash', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')

    it('User Can See All Deleted Clothes', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu "Clothes"
            cy.get('.navbar').contains('a', 'Clothes').click()
            cy.url().should('include', '/clothes')
            cy.screenshot(`TC-TR-001_Step-1-${date}`)

            // Step 2: In the Clothes Menu, Click the button "Deleted Clothes"
            cy.contains('a', 'Deleted Clothes').click()
            cy.url().should('include', '/clothes/trash')

            // Step 3: At the table, You can see the Qty, Clothes name, detail, category & type, properties, and action button
            const tableHeaders = ['Qty','Clothes Name', 'Description', 'Detail', 'Category & Type', 'Properties', 'Action']
            cy.get('#deleted_clothes-table').within(() => {
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

                        // Qty must be an integer
                        cy.get('td').eq(0).invoke('text').should('match', /^\d+$/)                        
            
                        // Detail must contain Size, Gender, Color
                        cy.get('td').eq(3).within(() => {
                            const expectedLabels = ['Size', 'Gender', 'Color']
                            cy.get('h6').each(($h6, idx) => {
                                cy.wrap($h6).should('have.text', expectedLabels[idx])
                            })
                        })
            
                        // Category & Type must contain Category and Type
                        cy.get('td').eq(4).within(() => {
                            const expectedLabels = ['Category', 'Type']
                            cy.get('h6').each(($h6, idx) => {
                                cy.wrap($h6).should('have.text', expectedLabels[idx])
                            })
                        })
            
                        // Properties must contain Deleted At
                        cy.get('td').eq(5).within(() => {
                            cy.get('h6').should('have.text', 'Deleted At')
                        })
            
                        // Action must contain two buttons (btn-danger and btn-success)
                        cy.get('td').eq(6).within(() => {
                            cy.get('button.btn-danger').should('exist')
                            cy.get('button.btn-success').should('exist')
                        })
                    })
                })
            })            
            
            // Evidence - Step 3
            cy.screenshot(`TC-TR-001_Step-2-${date}`)
        })
    })
})
