{

"importsRequired": <array of {name: string, from:string},

> name -> name of the import
>
> from -> place from where the import has to be made,>,
>
> Note - Imports for Child Components can be omitted from here, their imports will be placed at appropriate position in the final generated file.

"componentName": <string, Name of the component>,

"parentHTMLTag": <string, parent HTML tag of this component>,

"parentHTMLTagClasses": <string, CSS classes of the parent tag of this component>,

"content": <string, text content of the component will be given here,

>> this is to be given only if the component isn't further nested otherwise empty string or null will work>,
>>

"inlineCSS": <string, inline CSS for the parent tag, if required>,

"propsRequired": <array of {name: string, value:string,},

>> name-> name of prop, value-> value of prop (which was supplied)>,
>>

"statesAssociated": <array of {name: string, value:string},

>> name-> name of state, "object" etc), value-> value of state>,
>>

"generalVariablesAssociated": <array of {name: string, value:string},

>> name-> name of variable, value-> value of variable>,
>>

"useEffectCallsMade": <array of {code: string, dependencies:string[]},

>> code -> code that should be executed inside of useEffect function,
>>
>> dependencies -> the dependency array of useEffect,>,
>>

"functionsAssociated": <array of {name: string, inputArgs:string, outputVal:string, code:string},

>> name-> name of function,
>>
>> inputArgs-> array of input arguments it will take,
>>
>> code-> JS code of the function,>,
>>

"eventsAssociated":<array of {name: string, handler:string,},

>> name-> name of the event like onClick, onHover,
>>

>> handler-> name of the handler function for this event, it should be present in props, state or functions,>,
>>

"childComponents": <array of child component objects,

>> A child component will be represented as an object and it will have all the fields mentioned above with their corresponding values.
>>

>> So, every child component object will have its own "componentName", "parentHTMLTag", "content", "propsRequired", "childComponents" etc>,
>>

}
