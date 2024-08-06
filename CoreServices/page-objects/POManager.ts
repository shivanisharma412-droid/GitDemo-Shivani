import { Page } from "@playwright/test";
import { LoginPage } from "./logInPage";
import { ProviderPage } from "./Provider";
import { LocationsPage } from "./locations";
import { SpecialitiesPage } from "./specialities";
import { ConditionsAndDieseasesPage } from "./ConditionsAndDiseases";
import { TreatmentsAndProceduresPage } from "./TreatmentsAndProcedures";
import { DataHealthPage } from "./DataHealth";

/**
 * This is Page Object Manager Class. This class is created to avoid creating objects in different POM classes and 
 * reusing the objects if already created.
 * For each POM Class, individual method should be created as defined. 
 * In those methods, we are using if condition to verify whether the object is already present/created or not.
 * If the object is already present then method will use that to initialize respective POM class otherwise it will create new object.
 */
export class POManager {

    private readonly page: Page;
    private loginPage?: LoginPage;
    private providerPage?: ProviderPage;
    private locationsPage?: LocationsPage;
    private specialitiesPage?: SpecialitiesPage;
    private conditionsAndDiseasesPage?: ConditionsAndDieseasesPage;
    private treatmentsAndProceduresPage?: TreatmentsAndProceduresPage;
    private dataHealthPage?: DataHealthPage;

    constructor(page: Page) {

        this.page = page;
        
    }

    /**
     * 
     * @returns Object of Log In Page
     */

    getLoginPage(): LoginPage {
        
        if(!this.loginPage){
            this.loginPage = new LoginPage(this.page);
        }
        return this.loginPage;
    }

    /**
     * 
     * @returns Object of Provider Page
     */

    getProviderPage(): ProviderPage {

        if(!this.providerPage){
            this.providerPage = new ProviderPage(this.page);
        }
        return this.providerPage;
    }

    /**
     * 
     * @returns Object of Locations Page
     */
    
    getLocationsPage(): LocationsPage{

        if(!this.locationsPage){
            this.locationsPage = new LocationsPage(this.page);
        }
        return this.locationsPage;
    }
    
    /**
     * 
     * @returns Object of Specialties Page
     */

    getSpecialitiesPage(): SpecialitiesPage{

        if(!this.specialitiesPage){
            this.specialitiesPage = new SpecialitiesPage(this.page);
        }
        return this.specialitiesPage;
    }
    
    /**
     * 
     * @returns Object of Conditions And Diseases Page
     */

    getConditionsAndDiseasesPage(): ConditionsAndDieseasesPage{

        if(!this.conditionsAndDiseasesPage){
            this.conditionsAndDiseasesPage = new ConditionsAndDieseasesPage(this.page);
        }
        return this.conditionsAndDiseasesPage;
    }

    /**
     * 
     * @returns Object of Treatments And Procedures Page
     */

    getTreatmentsAndProceduresPage(): TreatmentsAndProceduresPage{

        if(!this.treatmentsAndProceduresPage){
            this.treatmentsAndProceduresPage = new TreatmentsAndProceduresPage(this.page);
        }
        return this.treatmentsAndProceduresPage;
    }

    /**
     * 
     * @returns Object of Data Health Page
     */

    getDataHealthPage(): DataHealthPage{

        if(!this.dataHealthPage){
            this.dataHealthPage = new DataHealthPage(this.page);
        }
        return this.dataHealthPage;
    }
}