// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-ST-002 - Stats', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')

    it('User Can See Summary Of Stats Page', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu "Stats"
            cy.get('.navbar').contains('a', 'Stats').click()
            cy.url().should('include', '/stats')

            // Step 2: Find section summary that contain title "Total Clothes" and "The Price". It should have valid total quantity, total variety, and prices.
            cy.get('#summary_stats-section').within(() => {
                const summaryTitle = ['Total Clothes','The Price']
                summaryTitle.forEach(dt => {
                    cy.contains('h1', dt).should('exist')            
                })
            
                const validTotal = ['Variety','Quantity'] 
                validTotal.forEach(dt => {
                    cy.get('h4').contains(dt).prev('b').invoke('text').then(text => {
                        const val = parseInt(text.trim())
                        expect(val).to.be.at.least(0)
                    })
                })
            
                const validPrice = ['Most Expensive','Average']
                validPrice.forEach(dt => {
                    cy.get('h4').contains(dt).prev('b').invoke('text').then(text => {
                        const val = parseInt(text.replace('Rp. ', '').replace('K', '').trim())
                        expect(val).to.be.at.least(0)
                    })
                })
            })
            
            // Evidence - Step 2
            cy.screenshot(`TC-ST-002_Step-2-${date}`)
        })
    })
})
