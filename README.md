## Personal notes to myself (you can ignore)
### Huge bugs to watch out for:

Note that when you're making a for loop over each file, the file reader takes a while to load and read the file. Therefore, you can't just setState after the for loop because the files almost certainly were not read by the time you setState with new items.

    function onChange(event) {
      const { files } = event.target

      if (FileReader && files && files.length) {
        const newItems = []

        for (const [i, file] of Object.entries(files)) {
          const reader = new FileReader()
          reader.onload = () => newItems.push({ // Add a new item. It must have a unique key!
            i: "n" + (counter + parseInt(i)),
            x: ((items.length + newItems.length) * 2) % (cols || 12),
            y: Infinity, // puts it at the bottom
            w: 2,
            h: 2,
            file: reader.result,
          })
          reader.readAsDataURL(file)
        }

        setCounter(prevCount => prevCount + files.length)
        setItems(prevItems => [...prevItems, ...newItems])
      }
    }

I tried fixing the issue by setting state at the last filereader.onload.

    for (const [i, file] of Object.entries(files)) {
      const reader = new FileReader()
      reader.onload = () => {
        newItems.push({ // Add a new item. It must have a unique key!
          i: "n" + (counter + parseInt(i)),
          x: ((items.length + newItems.length) * 2) % (cols || 12),
          y: Infinity, // puts it at the bottom
          w: 2,
          h: 2,
          file: reader.result,
        })

        if (i == files.length - 1) {
          setCounter(prevCount => prevCount + files.length)
          setItems(prevItems => [...prevItems, ...newItems])
        }
      }
      reader.readAsDataURL(file)
    }

However, I realized this may also cause a problem. It's not guaranteed that on the last reader.onload, the other filereader.onloads will also be completed. Therefore, you have to wait for all of them using await Promise.all()