# Requirements

## User Needs

### Actors
TODO: List and describe the actors/users for this product.

### User stories
TODO: Write brief user stories to explain how various actors would interact with the system to accomplish a goal.
    Express these in the form from agile development:- As a (role) I want (goal) so that (benefit). 

### Use Cases
TODO: Describe each use case (one per team member).
    Give each use case a unique ID, e.g. UC1, UC2, ...
    Summarise these using the use-case template below.

| USE-CASE | UC1: Find nearest public bike pump | 
| -------- | ---------------------------------- |
| **Description** | As a cyclist I want to find my nearest public bike pump. |
| **Actors** | cyclist |
| **Assumptions** | Browser supports geo-location |
| **Steps** | <ol><li>Opt to view table of bike pumps</li><li>Request permission to access user location</li><li>Give permission for geo-location</li><li>Get nearest public bike pumps from database</li><li>View table of nearest bike pumps</li></ol> |
| **Variations** | Browser doesn't support geo-location |
| **Non-functional** | TODO: OPTIONAL - List of non-functional requirements that the use case must meet. |
| **Issues** | TODO: OPTIONAL - List of issues that remain to be resolved |


| TODO: USE-CASE ID e.g. UC1, UC2, ... | TODO: USE-CASE NAME | 
| -------------------------------------- | ------------------- |
| **Description** | TODO: Goal to be achieved by use case and sources for requirement |
| **Actors** | TODO: List of actors involved in use case |
| **Assumptions** | TODO: Pre/post-conditions if any</td></tr>
| **Steps** | TODO: Interactions between actors and system necessary to achieve goal |
| **Variations** | TODO: OPTIONAL - Any variations in the steps of a use case |
| **Non-functional** | TODO: OPTIONAL - List of non-functional requirements that the use case must meet. |
| **Issues** | TODO: OPTIONAL - List of issues that remain to be resolved |


TODO: Your Use-Case diagram should include all use-cases.

![Insert your Use-Case Diagram Here](images/use-case.png)

## Software Requirements Specification
### Functional requirements
TODO: create a list of functional requirements. 
    e.g. "The system shall ..."
    Give each functional requirement a unique ID. e.g. FR1, FR2, ...
    Indicate which UC the requirement comes from.
    
* FR1: The system shall provide a menu of available options
* FR2: The system shall request permission to access user location
* FR3: The system shall get nearest public bike pumps from database
* FR4: The system shall show a table of the nearest bike pumps

<dl><dt>FR1:</dt><dd>The system shall provide a menu of available options</dd>
    <dt>FR2:</dt><dd>The system shall request permission to access user location</dd>
    <dt>FR3:</dt><dd>The system shall get nearest public bike pumps from database</dd>
    <dt>FR4:</dt><dd>The system shall show a table of the nearest bike pumps</dd>
</dl>


### Non-Functional Requirements
TODO: Consider one or more [quality attributes](https://en.wikipedia.org/wiki/ISO/IEC_9126) to suggest a small number of non-functional requirements.
Give each non-functional requirement a unique ID. e.g. NFR1, NFR2, ...

Indicate which UC the requirement comes from.
