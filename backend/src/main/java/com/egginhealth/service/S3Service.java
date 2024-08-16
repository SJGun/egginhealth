package com.egginhealth.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class S3Service {

    private final AmazonS3 amazonS3;

    @Value("${spring.cloud.aws.s3.bucket}")
    private String bucket;

    private String filePath;

    private String getFilePath() {
        if (filePath == null) {
            String projectRoot = System.getProperty("user.dir");
            filePath = (Objects.equals(projectRoot, File.separator) ? "" : projectRoot) + File.separator + "preprocessing" + File.separator;
        }
        return filePath;
    }

    /**
     * MultipartFile을 받아서 S3에 업로드
     *
     * @param multipartFile MultipartFile
     * @param dirName       폴더 이름
     * @return URL
     * @throws IOException 파일 예외
     */
    public String upload(MultipartFile multipartFile, String dirName) throws IOException {
        File uploadFile = convert(multipartFile)
                .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File 변환 실패"));
        return upload(uploadFile, dirName);
    }

    /**
     * File 객체를 S3에 업로드하고 URL을 반환하는 메서드
     *
     * @param uploadFile File 객체
     * @param dirName    폴더 이름
     * @return URL
     * @throws IOException 파일 예외
     */
    private String upload(File uploadFile, String dirName) throws IOException {
        String fileName = dirName + "/" + uploadFile.getName();
        String uploadImageUrl = putS3(uploadFile, fileName);
        removeNewFile(uploadFile);
        return uploadImageUrl;
    }

    private String putS3(File uploadFile, String fileName) {
        amazonS3.putObject(new PutObjectRequest(bucket, fileName, uploadFile)
                .withCannedAcl(CannedAccessControlList.PublicRead));
        return amazonS3.getUrl(bucket, fileName).toString();
    }

    /**
     * 로컬 서버에서 임시 파일을 삭제하는 메서드
     *
     * @param uploadFile 임시 파일
     * @throws IOException 파일 예외
     */
    private void removeNewFile(File uploadFile) throws IOException {
        Files.delete(uploadFile.toPath());
    }

    public Optional<File> convert(MultipartFile file) throws IOException {
        String originalFilename = file.getOriginalFilename();
        String uuid = UUID.randomUUID().toString();

        String uuidFilePath = getFilePath() + uuid + "_" + originalFilename.replaceAll("\\s", "_");

        File convertFile = new File(uuidFilePath);

        File parentDir = convertFile.getParentFile();
        if (parentDir != null && !parentDir.exists()) {
            parentDir.mkdirs();
        }

        if (convertFile.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(convertFile)) {
                fos.write(file.getBytes());
            }
            return Optional.of(convertFile);
        }
        return Optional.empty();
    }

    public void delete(String directoryName, String url) {
        String fileName = directoryName + "/" + URLDecoder.decode(url.substring(url.lastIndexOf("/") + 1), StandardCharsets.UTF_8);
        delete(fileName);
    }

    public void delete(String fileName) {
        amazonS3.deleteObject(bucket, fileName);
    }

}
