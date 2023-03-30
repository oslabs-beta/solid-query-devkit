import { ObjectComponent } from "./JSONComponents/ObjectComponent"
export default function QueryExplorer() {

    const testObj = {
        name: 'dakota',
        age: 28,
        cool: true,
        lilBit: true,
        somethingElse: undefined,
        testNull: null,
        arrTest: [1,2,3],
        arr2Test: ['test', 3, null, true, {'please': 'work'},{'hello': 'bye'}]
      }

    return (
        <>
        <div class="detailsHeader">
            <h3>Query Explorer</h3>
        </div>
        <ObjectComponent obj={testObj} key={'test'} level={1}/>
        </>
        
    )

}