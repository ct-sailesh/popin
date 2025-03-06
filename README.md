# POPIN 
# Vue 3 + Vite

This is as basic component for showing up images/urls in a popup window frame.

## Requirements
- [Node.js](https://nodejs.org/) (version 20.x or above)

## Steps to Get Started

### 1. Install Dependencies
->In the project root directory, run the following command to install the required dependencies:
```
npm install
```

### 2. Build for production
In the project root directory, run the following command to generate popin.js file:
```
npm run build
```

### 3. Usage
In the project include this popin js build:
```
<script type="text/javascript" src="/assets/components/popin.js"></script>
```

### 4. Setup
Add the data-popin attribute to href element with value (image/url)
```
<a data-popin="image" href="hello.jpg"><img src=hello_thumb.jpg"></a>

<a data-popin="url" href="https://www.example.com"><img src="example_thumb.jpg"></a>
```


### 5. For displaying popin in top parent window
```
<script>
$(document).ready(function () {
  $('a[data-popin]').on('click', function (event) {
    event.preventDefault();
    const content = $(this).attr('href');
    const type = $(this).data('popin');
    if (window.top !== window.self) {
      window.top.openGlobalPopin(content, type);
    } else {
      window.openGlobalPopin(content, type);
    }
  });
});
</script>
```


