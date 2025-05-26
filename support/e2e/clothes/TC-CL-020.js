// Components
import '../../components/template'

describe('Wardrobe E2E Test - TC-CL-020 - Clothes', () => {
    const username = 'flazefy'
    const password = 'nopass123'
    const date = new Date().toISOString().replace(/:/g, '-')

    it('User Can See Tommorow Schedule And Day after Tommorow Schedule', () => {
        // Pre Condition : User Must Logged In To Their Account
        cy.templateE2ELogin(username, password).then(() => {
            // Step 1: After Signed In. In the Navbar, Click the menu "Clothes"
            cy.get('.navbar').contains('a', 'Calendar').click()
            cy.url().should('include', '/calendar')

            // Step 2: Find section "Future Schedule". There will be two rows of item, The "Tommorow" and "Day after Tommorow" with its day
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            const tommorow_day_name = days[(new Date().getDay() + 1) % 7]
            const day_after_tommorow_day_name = days[(new Date().getDay() + 2) % 7]

            const list_header = ['Future Schedule',`Tommorow ${tommorow_day_name}`,`Day after Tommorow ${day_after_tommorow_day_name}`]
            list_header.forEach(dt => {
                cy.get('#tomorrow_schedule-section').contains(dt)
            })

            // Step 3: Each clothes contain clothes image, clothes name, category and type
            const list_clothes_holder = ['tomorrow_clothes-section','day_after_tomorrow_clothes-section']
            list_clothes_holder.forEach(dt => {
                cy.get(`#${dt}.row`).find('.col-xxl-2.col-xl-3.col-lg-3.col-md-3.col-sm-4.col-4').should('exist').each(($el,idx) => {
                    if(idx > 0){
                        cy.wrap($el).find('.box-clothes').should('exist').within(() => {
                            // Clothes Image
                            cy.wrap($el).find('img').should('exist')
                            // Clothes Name
                            cy.wrap($el).find('h4').should('exist').and('not.be.empty')
                            // Clothes Type & Category
                            cy.wrap($el).find('h6').should('exist').and('contain.text', '|')
                        })
                    }
                })
            })
            // Evidence - Step 3
            cy.screenshot(`TC-CL-020_Step-3-${date}`)
        })
    })
})
