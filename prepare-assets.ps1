$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$imageRoot = Join-Path $PSScriptRoot 'public\images'
New-Item -ItemType Directory -Path $imageRoot -Force | Out-Null
$generated = 'C:\Users\fgoudy\.codex\generated_images\01a18ccf-70e3-7c63-bdff-c9bd9bb78f3f'
$images = @{
  office = 'exec-96b67932-18de-47b0-a8ff-d8293aa5017e.png'
  cafe = 'exec-efadc39c-dd52-4f73-837c-1d647647491a.png'
  warehouse = 'exec-f525cc3d-516b-4cfb-af1c-c99847d23325.png'
  park = 'exec-47878f4a-e459-4fbf-a75c-ecdd0030a663.png'
  meeting = 'exec-2167ba38-5fcb-4bbf-80fb-82157a010abb.png'
  bicycle = 'exec-9778679e-8a33-4e87-9bc4-ad2cb5f91bb7.png'
}
foreach ($name in $images.Keys) {
  $img = [System.Drawing.Image]::FromFile((Join-Path $generated $images[$name]))
  $bmp = New-Object System.Drawing.Bitmap(960, 640)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.DrawImage($img, 0, 0, 960, 640)
  $bmp.Save((Join-Path $imageRoot ($name + '.jpg')), [System.Drawing.Imaging.ImageFormat]::Jpeg)
  $g.Dispose(); $bmp.Dispose(); $img.Dispose()
}
foreach ($size in @(192,512)) {
  $bmp = New-Object System.Drawing.Bitmap($size,$size)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.Clear([System.Drawing.ColorTranslator]::FromHtml('#215b46'))
  $pen = New-Object System.Drawing.Pen([System.Drawing.ColorTranslator]::FromHtml('#e4efb6')),($size/12)
  $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  $g.DrawLine($pen,[single]($size*.28),[single]($size*.72),[single]($size*.72),[single]($size*.28))
  $g.DrawLine($pen,[single]($size*.36),[single]($size*.28),[single]($size*.72),[single]($size*.28))
  $g.DrawLine($pen,[single]($size*.72),[single]($size*.28),[single]($size*.72),[single]($size*.64))
  $bmp.Save((Join-Path $PSScriptRoot ('public\icon-'+$size+'.png')), [System.Drawing.Imaging.ImageFormat]::Png)
  $pen.Dispose();$g.Dispose();$bmp.Dispose()
}
Write-Output 'Prepared 6 original scene JPEGs and 2 app icons.'
