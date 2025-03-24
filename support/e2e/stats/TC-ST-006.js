// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-ST-006 - Stats', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')

    it('User Can See List Most Used Clothes Daily per Clothes Type', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu "Stats"
            cy.get('.navbar').contains('a', 'Stats').click()
            cy.url().should('include', '/stats')

            // Step 2: Find section "Most Used Clothes Daily per Clothes Type". It should have list of day name and list clothes
            cy.get(`#most_used_clothes_daily_per_clothes_type_list-section`).contains('Most Used Clothes Daily per Clothes Type')
            // Evidence - Step 2
            cy.screenshot(`TC-ST-006_Step-2-${date}`)

            const labelChart = ['Today','Mon','Tue','Wed','Thu','Fri','Sat']
            labelChart.forEach(dt => {
                cy.get(`#most_used_clothes_daily_per_clothes_type_list-section`).contains(dt)

                if(dt != 'Today'){
                    cy.get(`h4[href="#collapseMostUsedDaily_${dt}"]`).then($h4 => {
                        if ($h4.hasClass('collapsed')) {
                            cy.wrap($h4).click()
                        }
                    })

                    cy.get(`#collapseMostUsedDaily_${dt}`).within(() => {
                        // Step 3: Each day if they have clothes list, it must have clothes name, type, category, total used, and last used. Each day must have single clothes variation by its type
                        cy.get('.row').first().then(row => {
                            const hasNoMessage = row.children('.fst-italic').length > 0
                            const hasClothes = row.children('.col-lg-3.col-md-4.col-sm-6.col-6').length > 0
                    
                            if (hasNoMessage) {
                                expect(row.children('.fst-italic').text().trim()).to.equal('- No Clothes Has Used On This Day -')
                            } else if (hasClothes) {
                                cy.wrap(row).find('.col-lg-3.col-md-4.col-sm-6.col-6').should('exist')
                                const cols = row.children('.col-lg-3.col-md-4.col-sm-6.col-6')
                                let typesSet = []

                                cols.each((index, col) => {
                                    cy.wrap(col).find('h4').should('not.be.empty') // Clothes name

                                    cy.wrap(col).find('h6').eq(0).invoke('text').then(text => {
                                        // Clothes category and type
                                        expect(text).to.include('|')
                                        const parts = text.split('|').map(t => t.trim())
                                        expect(parts.length).to.be.greaterThan(1)

                                        // Unique type per day validation
                                        const type = parts[1]
                                        expect(typesSet).to.not.have.members([type])
                                        typesSet.push(type)
                                    })

                                    cy.wrap(col).find('h6:contains("Total Used")').should('exist').next().should('contain', 'Last Used')
                                })
                            } else {
                                throw new Error('Row does not contain expected elements')
                            }
                        })
                    })                    
                }
            })
        })
    })
})
