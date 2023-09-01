import { Input, Button, Label } from "@/components/ui";

export function NewSoundForm(){
    async function submitHandler(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        // @ts-ignore
        const formData = new FormData(e.target)
        // todo: validate
        await fetch("/api/boards/new", {
            method: "POST",
            body: formData
        })
    }

    return (
		<form method="POST" onSubmit={submitHandler} className="space-y-4">
			<div className="space-y-1">
				<Label htmlFor="sound">Sound Url</Label>
				<Input name="url" required aria-required id="sound" type="url" />
			</div>
			<Button type="submit" className="w-full">Save</Button>
		</form>
	)
}   