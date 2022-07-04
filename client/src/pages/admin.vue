<template>
    <form method="POST" action="/" enctype="multipart/form-data">
        <input type="file" name="file" accept="images/*" required>
        <input type="text" name="title" required>
        <input type="text" placeholder="není povinné" name="description" required>
        <input type="submit" value="Upload">
    </form>
</template>

<script>

</script>

<style>

</style>