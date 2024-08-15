package com.egginhealth.data.dto;

import org.springframework.web.multipart.MultipartFile;

public record OcrDto(
        MultipartFile image
) {
}
