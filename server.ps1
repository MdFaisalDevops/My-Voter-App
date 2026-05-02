$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8080/")
$listener.Start()
Write-Host "Server running at http://localhost:8080" -ForegroundColor Green
while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $req = $ctx.Request
    $res = $ctx.Response
    $urlPath = $req.Url.AbsolutePath
    if ($urlPath -eq "/" ) { $urlPath = "/index.html" }
    $filePath = "f:\My-voter-app" + $urlPath.Replace("/", "\")
    if (Test-Path $filePath -PathType Leaf) {
        $bytes = [System.IO.File]::ReadAllBytes($filePath)
        $ext = [System.IO.Path]::GetExtension($filePath)
        $mimeMap = @{ ".html" = "text/html; charset=utf-8"; ".css" = "text/css"; ".js" = "application/javascript" }
        $mime = $mimeMap[$ext]
        if (-not $mime) { $mime = "application/octet-stream" }
        $res.ContentType = $mime
        $res.ContentLength64 = $bytes.Length
        $res.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
        $res.StatusCode = 404
    }
    $res.OutputStream.Close()
}
