// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-CL-012 - Clothes', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')

    it('User Can See Last Added And Deleted Clothes When User Want To Add A New Clothes', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu "Clothes"
            cy.get('.navbar').contains('a', 'Clothes').click()
            cy.url().should('include', '/clothes')

            // Step 2: In the Clothes Page, Search "Add Clothes" button
            cy.contains('a', 'Add Clothes').click()
            cy.url().should('include', '/clothes/add')
            // Evidence - Step 2
            cy.screenshot(`TC-CL-012_Step-2-${date}`)

            // Step 3: There will be section with title "Last History" title. Inside it you will find Last Added Clothes and its date, alongside with Last Deleted and its date
            cy.get('#last_history-section').within(() => {
                cy.get('h1').should('contain.text', 'Last History')
              
                // Last Added & Last Deleted
                const date_holder = ['Last Added','Last Deleted']
                date_holder.forEach(dt =>{
                    cy.contains('h5', dt).should('exist').parent().within(() => {
                        cy.get('h3').invoke('text').then(text => {
                            const added_text = text.trim()
                            expect(added_text).to.not.equal('')
                    
                            if (added_text != '-') {
                                cy.get('h5').contains(/^on /).invoke('text').then(date_text => {
                                    const date = date_text.replace('on ', '').trim()
                                    const is_valid = !isNaN(new Date(date).getTime())
                                    expect(is_valid).to.be.true
                                });
                            } else {
                                cy.get('h5').should('contain.text', '-')
                            }
                        });
                    });
                })
            });
            // Evidence - Step 3
            cy.screenshot(`TC-CL-012_Step-3-${date}`)
        })
    })
})
