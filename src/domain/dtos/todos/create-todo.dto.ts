
export class CreateTodoDTO {
    private constructor(
        //Properties
        public readonly text:string
    ){}

    static create(props: {[key:string]: any}) : [string?, CreateTodoDTO?] {
        const {text} = props;

        if(!text) return ['Text is requirewd', undefined];

        return[undefined, new CreateTodoDTO(text)];
    }
}