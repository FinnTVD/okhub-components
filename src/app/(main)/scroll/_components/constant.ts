export const example1Code = `
<Button onClick={() => setOpen(true)}>
  <span>Open Sheet</span>
</Button>
<SheetProvider
  open={open}
  setOpen={setOpen}
  className="!w-[50rem] !min-w-[50rem] !max-w-[50rem] !p-0 !m-0"
>
  <div
    id="container_book_now"
    className="relative h-screen w-full overflow-y-auto"
  >
    <div className="sticky top-4 left-0 w-full z-50 h-fit flex items-center justify-between">
      {Array.from({ length: 5 }).map((_, index) => (
        <Button
          key={index}
          onClick={() =>
            scrollToElement(
              "container_book_now",
              \`taskbar-\${index}\`,
              1,
              5
            )
          }
        >
          <span>Taskbar {index}</span>
        </Button>
      ))}
    </div>
    <div
      id="taskbar-0"
      className="w-full h-full bg-red-500"
    ></div>
    <div
      id="taskbar-1"
      className="w-full h-full bg-green-500"
    ></div>
    <div
      id="taskbar-2"
      className="w-full h-full bg-blue-500"
    ></div>
    <div
      id="taskbar-3"
      className="w-full h-full bg-yellow-500"
    ></div>
    <div
      id="taskbar-4"
      className="w-full h-full bg-purple-500"
    ></div>
  </div>
</SheetProvider>
`
export const example2Code = `
<Button onClick={() => setOpen(true)}>
  <span>Open Sheet</span>
</Button>
<SheetProvider
  open={open}
  setOpen={setOpen}
  className="!w-[50rem] !min-w-[50rem] !max-w-[50rem] !p-0 !m-0"
>
  <div
    id="container_book_now"
    className="relative h-screen w-full overflow-y-auto"
  >
    <div className="sticky top-4 left-0 w-full z-50 h-fit flex items-center justify-between">
      {Array.from({ length: 5 }).map((_, index) => (
        <Button
          key={index}
          onClick={() =>
            scrollToElement(
              "container_book_now",
              \`taskbar-\${index}\`,
              1,
              5
            )
          }
        >
          <span>Taskbar {index}</span>
        </Button>
      ))}
    </div>
    <div
      id="taskbar-0"
      className="w-full h-full bg-red-500"
    ></div>
    <div
      id="taskbar-1"
      className="w-full h-full bg-green-500"
    ></div>
    <div
      id="taskbar-2"
      className="w-full h-full bg-blue-500"
    ></div>
    <div
      id="taskbar-3"
      className="w-full h-full bg-yellow-500"
    ></div>
    <div
      id="taskbar-4"
      className="w-full h-full bg-purple-500"
    ></div>
  </div>
</SheetProvider>
`