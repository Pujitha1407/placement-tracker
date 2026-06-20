package com.smartplacement.placement_tracker.controller;

import org.springframework.web.bind.annotation.*;
import com.smartplacement.placement_tracker.model.PlacementRecord;
import com.smartplacement.placement_tracker.service.PlacementRecordService;
import com.smartplacement.placement_tracker.dto.PlacementRecordDTO;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/placements")
@CrossOrigin(origins = "http://localhost:3000")
public class PlacementRecordController {

    private final PlacementRecordService placementRecordService;

    public PlacementRecordController(PlacementRecordService placementRecordService) {
        this.placementRecordService = placementRecordService;
    }

    @GetMapping
    public List<PlacementRecordDTO> getAllRecords() {
        return placementRecordService.getAllRecords()
                .stream()
                .map(record -> new PlacementRecordDTO(
                        record.getId(),
                        record.getStudent(),
                        record.getCompany(),
                        record.getJobRole(),
                        record.getPackageOffered(),
                        record.getStatus()
                ))
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public PlacementRecordDTO getRecordById(@PathVariable Long id) {
        PlacementRecord record = placementRecordService.getRecordById(id);
        return new PlacementRecordDTO(
                record.getId(),
                record.getStudent(),
                record.getCompany(),
                record.getJobRole(),
                record.getPackageOffered(),
                record.getStatus()
        );
    }

    @PostMapping
    public PlacementRecordDTO addRecord(@RequestBody PlacementRecord record) {
        PlacementRecord saved = placementRecordService.saveRecord(record);
        return new PlacementRecordDTO(
                saved.getId(),
                saved.getStudent(),
                saved.getCompany(),
                saved.getJobRole(),
                saved.getPackageOffered(),
                saved.getStatus()
        );
    }

    // ✅ Update only status
    @PutMapping("/{id}/status")
    public PlacementRecordDTO updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        PlacementRecord record = placementRecordService.getRecordById(id);
        String newStatus = body.get("status");
        record.setStatus(newStatus);

        PlacementRecord updated = placementRecordService.saveRecord(record);

        return new PlacementRecordDTO(
                updated.getId(),
                updated.getStudent(),
                updated.getCompany(),
                updated.getJobRole(),
                updated.getPackageOffered(),
                updated.getStatus()
        );
    }

    @DeleteMapping("/{id}")
    public void deleteRecord(@PathVariable Long id) {
        placementRecordService.deleteRecord(id);
    }
}
