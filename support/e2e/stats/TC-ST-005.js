// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-ST-005 - Stats', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')

    it('User Can See Stats Of Yearly Activity', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu "Stats"
            cy.get('.navbar').contains('a', 'Stats').click()
            cy.url().should('include', '/stats')

            // Step 2: Find section "Yearly Activity". It should have chart and label of day name
            cy.get(`#clothes_yearly_activity_stats-section`).contains('Yearly Activity')
            cy.get('#clothes_yearly_activity_stats-section').within(() => {
                cy.get('.apexcharts-canvas').should('exist')
                cy.get('.apexcharts-legend').should('exist')
            });   
            const labelChart = ['Days','Mon','Tue','Wed','Thu','Fri','Sat']
            labelChart.forEach(dt => {
                cy.get(`#clothes_yearly_activity_stats-section`).contains(dt)
            })
            
            // Evidence - Step 2
            cy.screenshot(`TC-ST-005_Step-2-${date}`)
        })
    })
})
