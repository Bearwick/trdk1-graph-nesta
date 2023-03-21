export default {
  // OUTDATED
  getODAProblems: (limit: number, offset: number) => `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    select * where {
      ?s rdf:type <urn:absolute:ODA2.0#ODAProblem> 
  } limit ${limit} offset ${offset}`,
  addODAProblem: (nodeName: string, title: string, specificProblem: string, clearDataProduct: string, accessibleData: string, supplier: string) => `
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX owl: <http://www.w3.org/2002/07/owl#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX oda: <urn:absolute:ODA2.0#>
  insert data {
    oda:${nodeName} rdf:type oda:ODAProblem.
    
    oda:${nodeName}SpecificProblem rdf:type oda:SpecificProblem.
    oda:${nodeName}ClearDataProduct rdf:type oda:ClearDataProduct.
    oda:${nodeName}AccessibleData rdf:type oda:AccesibleData.
    
    oda:name rdf:type owl:NamedIndividual.
    oda:${nodeName}SpecificProblem rdf:type owl:NamedIndividual.
    oda:${nodeName}ClearDataProduct rdf:type owl:NamedIndividual.
    oda:${nodeName}AccessibleData rdf:type owl:NamedIndividual.
    
    oda:${nodeName} oda:hasSpecificProblem oda:${nodeName}SpecificProblem.
    oda:${nodeName} oda:hasClearDataProduct oda:${nodeName}ClearDataProduct.
    oda:${nodeName} oda:hasAccesibleData oda:${nodeName}AccessibleData.
    oda:${nodeName} oda:hasVendor oda:${supplier}.
    
    oda:${nodeName} rdfs:comment "${title}".
    oda:${nodeName}SpecificProblem rdfs:comment "${specificProblem}".
    oda:${nodeName}ClearDataProduct rdfs:comment "${clearDataProduct}".
    oda:${nodeName}AccessibleData rdfs:comment "${accessibleData}".
  }`,

}
